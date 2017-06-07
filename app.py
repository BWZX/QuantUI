import asyncio
from aiohttp import web
import aiohttp_jinja2
import jinja2
import sys
sys.path.append('./control')
import staticfile as static
import middlewares
import views



# @asyncio.coroutine
# def Database(future):
#     '''
#     data is from the http response in main module.
#     '''
#     global engine
#     engine = yield from create_engine(user='root',db='hot',port=3306,\
#                                         host='127.0.0.1', password='11111',\
#                                         echo=True, charset='utf8')
#     future.set_result(engine)


# @asyncio.coroutine
# def CloseDB():
#     engine.close()
#     yield from engine.wait_closed()
#     pass
# # web.run_app(app,port=9999)
@asyncio.coroutine
def init(loop):
    app = web.Application(middlewares=[middlewares.middleware_factory])
    aiohttp_jinja2.setup(app,
        loader=jinja2.FileSystemLoader('./view'))

    # app.router.add_route('GET', '/', mainpage.showMainPage)

    # app.router.add_route('GET', '/productbuyer', mainpage.showBuyerPage)
    # app.router.add_route('GET', '/productseller', mainpage.showSellerPage)
    # app.router.add_route('GET', '/productmatchlist', mainpage.showMatchList)
    # app.router.add_static('/static/', './bower_components')
    # app.router.add_static('/static/', './node_modules')

    app.router.add_route('GET','/mainpage/', views.mainPage),    
    # app.router.add_route('GET','/postdata/', svr.postData),   
    app.router.add_route('GET','/data_code_view/', views.renderFun),
    app.router.add_route('GET','/data_detail/', views.renderFun),
    app.router.add_route('GET','/data_new/', views.renderFun),
    app.router.add_route('GET','/data_self_list/', views.renderFun),
    app.router.add_route('GET','/data_standard_list/', views.renderFun),
    app.router.add_route('GET','/data_order_list/', views.renderFun),
    app.router.add_route('GET','/data_self_list/', views.renderFun),
    app.router.add_route('GET','/first/', views.renderFun),
    app.router.add_route('GET','/stratyge_backtest_code/', views.renderFun),
    app.router.add_route('GET','/stratyge_backtest_result/', views.renderFun),
    app.router.add_route('GET','/stratyge_detail/', views.renderFun),
    app.router.add_route('GET','/stratyge_list/', views.renderFun),
    app.router.add_route('GET','/stratyge_model_list/', views.renderFun),
    app.router.add_route('GET','/stratyge_model_list/', views.renderFun),  
    app.router.add_route('GET','/stratyge_new/', views.renderFun),
    app.router.add_route('GET','/stratyge_train/', views.renderFun),
    # app.router.add_static('/statics/', './node_modules')
    app.router.add_static('/','./public')
    srv = yield from loop.create_server(
        app.make_handler(), '0.0.0.0', 8888)
    print('Sever starts at port: 8888')
    return srv

if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    # future = asyncio.Future()
    # asyncio.ensure_future(Database(future))
    # loop.run_until_complete(future)
    # engine = future.result()

    # hot.initialDatabase(engine)

    loop.run_until_complete(init(loop))
    try:
        loop.run_forever()
    except KeyboardInterrupt:
        pass
