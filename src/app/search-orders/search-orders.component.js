/**
 * @author : Shalitha Anuradha <shalithaanuradha123@gmail.com>
 * @since : 2021-03-19
 **/
import searchOrders from './search-orders.component.html';
import style from './search-orders.component.scss';


$("app-search-orders").replaceWith('<div id="search-orders">'+searchOrders+'</div>');
var html='<style>'+ style +'</style>';
$("#search-orders").append(html);
