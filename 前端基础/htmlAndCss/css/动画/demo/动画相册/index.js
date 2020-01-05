/**
 * @description 页面加载的时候进行图片添加旋转动画
 * */
window.onload = function () {
  const imgList=document.querySelector('.img-list');
  const imgs=document.querySelectorAll('.img-list>img');
  const imgLength=imgs.length;
  const imgRotateDeg=360/imgLength;
  imgs.forEach((imgElement,index)=>{
     imgElement.style.transform=`rotateY(${imgRotateDeg*index}deg) translateZ(300px)  `;
     imgElement.style.transition=`1.5s linear ${(imgLength-index-1)*0.2}s`;
  });
  let num=0;
  setInterval(function () {
    num++;
    imgList.style.transform=` rotateX(-10deg) rotateY(${num*0.2}deg)  `;
  },30)
};
