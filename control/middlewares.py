import asyncio
from aiohttp import web

@asyncio.coroutine
def middleware_factory(app, handler):
    @asyncio.coroutine
    def middleware_handler(req):
        # if req.path == '/' or req.path.startswith('/static/')\
        #         or req.cookies.get('uid') == users['psw']:
        # if req.path.startswith('/private/') and \
        # req.cookies.get('Authentication') != cookies['Authentication']:
        #     #print(req.cookies.get('uid'))
        #     return web.HTTPFound('/')

        # else:
        #     # print(req.path)
        #     return await handler(req)
        #     pass
        hand = yield from handler(req)
        return hand
        pass

    return middleware_handler
