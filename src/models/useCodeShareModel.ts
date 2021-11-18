import { useState, useCallback, useRef } from 'react'
import { message } from 'antd'
import { MessageType } from 'antd/es/message'
import Peer from 'peerjs'
import { throttle } from 'lodash'

import { CODE_SHARE_TYPE, ICodeShareMessage, ICodeShareStatus } from '@/types'

export default function useCodeShareModel() {
  const [isCodeShareConfigured, setCodeShareConfigured] = useState<string>()
  const [codeShareSelectorVisible, setCodeShareSelectorVisible] = useState<boolean>(!isCodeShareConfigured)
  const [codeShareType, setCodeShareType] = useState<CODE_SHARE_TYPE>('INTERVIEWER')
  const peerConnectionRef = useRef<Peer.DataConnection>()
  const [shareStatus, setShareStatus] = useState<ICodeShareStatus>(ICodeShareStatus.IDLE)
  const codeChangeFromCandidateSubscriptionRef = useRef<(id: string, code: string) => void>()

  const changeCodeShareSelectoVisible = useCallback(
    (visible: boolean) => {
      setCodeShareSelectorVisible(visible)
      setCodeShareConfigured('true')
    },
    [setCodeShareSelectorVisible, setCodeShareConfigured]
  )

  // following funcs should be called from Interviewer side
  const subscribeCodeChangeFromCandidate = useCallback(
    (sub: (id: string, code: string) => void) => {
      codeChangeFromCandidateSubscriptionRef.current = sub
    },
    [codeChangeFromCandidateSubscriptionRef]
  )

  const startInterviewing = useCallback(
    (token: string) => {
      setShareStatus(ICodeShareStatus.CONNECTING)
      const destroyWaitingMessage = message.loading(`[${token}] Waiting for candidate to connect`, 0)
      let destroyDisconnectWarning: null | MessageType = null

      const peer = new Peer(token, {
        debug: 2,
      })

      peer.on('connection', function (c) {
        setShareStatus(ICodeShareStatus.CONNECTED)

        destroyWaitingMessage()
        if (destroyDisconnectWarning) {
          destroyDisconnectWarning()
        }
        message.info('Candidate has been connected')

        c.on('data', (data: ICodeShareMessage) => {
          if (data.type === 'CODE') {
            if (codeChangeFromCandidateSubscriptionRef.current) {
              codeChangeFromCandidateSubscriptionRef.current(data.data.exam, data.data.code)
            }
          }
        })
        c.on('close', () => {
          destroyDisconnectWarning = message.warn(
            `[${token}] Candidate has left, Please confirm if the interview has been completed or waiting for the candidate to reconnect`,
            0
          )
        })
      })
      peer.on('disconnected', function () {
        console.log('Connection lost. Please reconnect')

        peer.reconnect()
      })
      peer.on('close', function () {
        console.log('Connection destroyed')
      })
      peer.on('error', function (err) {
        console.log(err)
      })
    },
    [setShareStatus, codeChangeFromCandidateSubscriptionRef]
  )

  // following funcs should be called from candidate side
  const startCoding = useCallback(
    (tokenFromHost: string) => {
      setShareStatus(ICodeShareStatus.CONNECTING)
      const destroyWaitingMessage = message.loading(`Connecting to the host [${tokenFromHost}]`, 0)

      const peer = new Peer(undefined, {
        debug: 2,
      })

      peer.on('open', (id) => {
        setTimeout(() => {
          const conn = peer.connect(tokenFromHost, {
            reliable: true,
          })

          peerConnectionRef.current = conn

          conn.on('open', () => {
            setShareStatus(ICodeShareStatus.CONNECTED)
            destroyWaitingMessage()

            message.info('Connected to the host, you are ready to start')
          })
          // Handle incoming data (messages only since this is the signal sender)
          conn.on('data', (data) => {
            console.log('send data')
          })

          conn.on('close', () => {
            message.warn('Host has left, plese make sure if you have any network issue', 0)
          })
        }, 500)
      })

      peer.on('connection', function (c) {
        // Disallow incoming connections
        c.on('open', () => {
          c.send('Sender does not accept incoming connections')
          setTimeout(function () {
            c.close()
          }, 500)
        })
      })

      peer.on('disconnected', function () {
        console.log('Connection lost. Please reconnect')

        // Workaround for peer.reconnect deleting previous id
        peer.reconnect()
      })
      peer.on('close', function () {
        console.log('Connection destroyed')
      })

      peer.on('error', function (err) {
        console.log(err)
      })
    },
    [setShareStatus, peerConnectionRef]
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sendCodeToInterviewer = useCallback(
    throttle(
      (exam: string, code: string) => {
        if (peerConnectionRef.current) {
          peerConnectionRef.current.send({
            type: 'CODE',
            data: {
              exam,
              code,
            },
          } as ICodeShareMessage)
        }
      },
      2000,
      { leading: true, trailing: true }
    ),
    [peerConnectionRef]
  )

  return {
    codeShareType,
    setCodeShareType,
    codeShareSelectorVisible,
    changeCodeShareSelectoVisible,
    startInterviewing,
    startCoding,
    shareStatus,
    sendCodeToInterviewer,
    subscribeCodeChangeFromCandidate,
  }
}
