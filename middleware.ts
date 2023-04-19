import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization')
  const url = req.nextUrl

  // IP ホワイトリスト検証
  const ipWhitelist = process.env.IP_WHITELIST?.split(';');
  const reqIps = req.headers.get('x-forwarded-for')?.split(', ');
	if (ipWhitelist !== undefined && reqIps !== undefined) {
    // IP ホワイトリストに含まれていればアクセス許可
    if (reqIps.some((ip) => ipWhitelist.includes(ip))) {
      if (basicAuth) {
        const authValue = basicAuth.split(' ')[1]
        const [user, pwd] = atob(authValue).split(':')

        if (user === process.env.BASIC_AUTH_USER && pwd === process.env.BASIC_AUTH_PASS) {
          return NextResponse.next()
        }
      }
      url.pathname = '/api/auth'

      return NextResponse.rewrite(url)
    }
  }

  // ステータスは 200 なのであれだが middleware ではそれが手軽にできないので一旦許容
  return NextResponse.json({
    message: '社内から接続するかVPNに繋いでください / Please connect from inside the company or connect to a VPN'
  });
}
