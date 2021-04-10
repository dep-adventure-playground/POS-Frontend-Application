/**
 * @author : Shalitha Anuradha <shalithaanuradha123@gmail.com>
 * @since : 2021-03-19
 **/
import placeOrders from './place-orders.component.html';
import style from './place-orders.component.scss';


$("app-place-orders").replaceWith('<div id="place-orders">'+placeOrders+'</div>');
var html='<style>'+ style +'</style>';
$("#place-orders").append(html);




// $("app-manage-items").replaceWith('<div id="manage-items">' + manageItems + '</div>');
// var html = '<style>' + style + '</style>';
// $("#dashboard").append(html);
