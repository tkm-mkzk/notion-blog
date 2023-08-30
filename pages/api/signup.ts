import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { authOptions, prismaAdapter } from './auth/[...nextauth]'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions)
  if ((!session?.user as any).id) {
    return res.status(401).end()
  }

  if (prismaAdapter.getUser) {
    let user = await prismaAdapter.getUser((session!.user as any).id!)
    if (!user || user.email) {
      return res.status(401).end()
    }
    if (prismaAdapter.updateUser) {
      await prismaAdapter.updateUser({ ...user, email: req.body['email'] })
    }
  }

  res.status(200).json({})
}
