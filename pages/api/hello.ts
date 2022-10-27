import type { NextApiRequest, NextApiResponse } from 'next'

interface Message {
  message: string
}

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  res.status(200).json({ message: 'Hello!' })
}
