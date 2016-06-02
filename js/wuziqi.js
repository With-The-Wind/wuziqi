$(function(){
  var canvas = document.querySelector('#canvas');
  var ctx = canvas.getContext('2d');
  var r = function(deg){
    return Math.PI/180*360;
  }
  var widths = 600;
  var flag = true;
  var dict={};
  var step=0;
  dict={};
  flag=true;
  var dans;
  var dan;
  var momo;
  var width;
  var height;
  var audio = $('#audio').get(0);
  audio.play();
  audio.onended = function(){
    audio.play();
  }
  $('#put').on('keydown',function(e){
    widths = Number($('#put').val());
    if(widths>=300&&widths<=900){
      console.log(widths)
      if(e.keyCode===13){
        ctx.clearRect(0,0,widths,widths)
        qipan();
      }
    }
  })
  var qipan = function(){
    $('#put').val('');
    dans = widths/15/2+0.5;
    dan = widths/15;
    momo = widths - dan;
    width = $('#canvas').get(0).width = widths;
    height = $('#canvas').get(0).height = widths;
    ctx.fillStyle = 'rgba(244, 192, 103, 0.57)';
    ctx.fillRect(0,0,width,height);
    ctx.strokeRect(0,0,width,height);
    console.log(width)
    //吊绳
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = '#e8e1ca';
    ctx.arc(dan*4,dan/4,3,0,r(360));
    ctx.arc(dan*11,dan/4,3,0,r(360));
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    //吊绳
    //旋转
    //旋转
    ctx.save();
    ctx.translate(dans,dans);
      ctx.save();
      ctx.beginPath();
      for(var i = 0; i < 15; i++){
        ctx.moveTo(0,0);
        ctx.lineTo(0,momo);
        ctx.translate(dan,0)
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
      ctx.save();
      ctx.beginPath();
      for(var i = 0; i < 15; i++){
        ctx.moveTo(0,0);
        ctx.lineTo(momo,0);
        ctx.translate(0,dan)
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
      //第一个
      ctx.save();
      ctx.translate(dan*3,dan*3);
      ctx.beginPath();
      ctx.arc(0,0,5,0,r(360));
      ctx.fillStyle = '#000';
      ctx.fill();
      ctx.closePath();
      ctx.restore()
      //第二个
      ctx.save();
      ctx.translate(dan*11,dan*3);
      ctx.beginPath();
      ctx.arc(0,0,5,0,r(360));
      ctx.fillStyle = '#000';
      ctx.fill();
      ctx.closePath();
      ctx.restore()
      //第三个
      ctx.save();
      ctx.translate(dan*7,dan*7);
      ctx.beginPath();
      ctx.arc(0,0,5,0,r(360));
      ctx.fillStyle = '#000';
      ctx.fill();
      ctx.closePath();
      ctx.restore()
      //第四个
      ctx.save();
      ctx.translate(dan*3,dan*11);
      ctx.beginPath();
      ctx.fillStyle = '#000';
      ctx.arc(0,0,5,0,r(360));
      ctx.fill();
      ctx.closePath();
      ctx.restore()
      //第五个
      ctx.save();
      ctx.translate(dan*11,dan*11);
      ctx.beginPath();
      ctx.arc(0,0,5,0,r(360));
      ctx.fillStyle = '#000';
      ctx.fill();
      ctx.closePath();
      ctx.restore()
    ctx.restore();
  }
  var changjing = function(){
    //下子
    ctx.save();
    var drop = function(qizi){
      ctx.save();
      ctx.translate(qizi.x*dan+0.5+dan/2,qizi.y*dan+0.5+dan/2);
      ctx.beginPath();
      ctx.arc(0,0,dan/15*5,0,r(360));
      if(qizi.m===0){
        ctx.fillStyle = 'black';
        $('#audio1').get(0).play();
      }else{
        ctx.fillStyle = '#fff';
        $('#audio2').get(0).play();
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
    $('#canvas').on('click',function(e){
      var qizi;
      var l = Math.floor(((e.offsetX)/dan));
      var t = Math.floor(((e.offsetY)/dan));
      if(dict[l+'-'+t]){
        return ;
      }
      if(flag===true){
        flag = false;
        qizi = {x:l,y:t,m:0,step:step+=1}
        drop(qizi);
      }else{
        qizi = {x:l,y:t,m:1,step:step+=1}
        flag = true;
        drop(qizi);
      }
      dict[l+'-'+t] = qizi;
      console.log(dict)
      //判断输赢
      var shuju={};
      $.each(dict,function(k,v){
        if(v.m===qizi.m){
          shuju[k]=v;
        }
      })
      var tx,ty;
      var shu=1,hang=1,xiez=1,xiey=1;
      tx=qizi.x;
      ty=qizi.y;
      while(shuju[tx+'-'+(ty+1)]){
        shu++;
        ty++;
      }
      tx=qizi.x;
      ty=qizi.y;
      while(shuju[tx+'-'+(ty-1)]){
        shu++;
        ty--;
      }
      tx=qizi.x;
      ty=qizi.y;
      while(shuju[(tx+1)+'-'+ty]){
        hang++;
        tx++;
      }
      tx=qizi.x;
      ty=qizi.y;
      while(shuju[(tx-1)+'-'+ty]){
        hang++;
        tx--;
      }
      tx=qizi.x;
      ty=qizi.y;
      while(shuju[(tx+1)+'-'+(ty-1)]){
        xiez++;
        tx++,ty--;
      }
      tx=qizi.x;
      ty=qizi.y;
      while(shuju[(tx-1)+'-'+(ty+1)]){
        xiez++;
        ty++,tx--;
      }
      tx=qizi.x;
      ty=qizi.y;
      while(shuju[(tx+1)+'-'+(ty+1)]){
        xiey++;
        tx++,ty++;
      }
      tx=qizi.x;
      ty=qizi.y;
      while(shuju[(tx-1)+'-'+(ty-1)]){
        xiey++;
        ty--,tx--;
      }
      if(shu>=5||hang>=5||xiez>=5||xiey>=5){
        $('#result').css('display','block');
        if(qizi.m===0){
          $('#success').removeClass('qi')
        }else{
          $('#success').addClass('qi');
        }
      }
      //判断输赢
    })
    ctx.restore();
    //重新开始
    $('#restart').on('click',function(){
      $('#result').css('display','none');
      ctx.clearRect(0,0,width,height);
      flag = true;
      dict={};
      qipan();
      changjing();
    })
    //生成棋谱
    $('#set').on('click',function(){
      $('#save').css('display','block');
      $('#return').css('display','block');
      $('#result').css('display','none');
      ctx.save();
      ctx.font = "20px consolas";
      $.each(dict,function(k,v){
        if(v.m===0){
          ctx.fillStyle = '#fff';
        }else{
          ctx.fillStyle = 'black';
        }
        ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        v.step,
        (v.x+0.5)*dan,
        (v.y+0.5)*dan);
      })
      ctx.restore();
      var image = $('#canvas').get(0).toDataURL('image/jpg',1);
      $('#save').attr('href',image);
      $('#save').attr('download','qipu.png');
    })
  }
  $('#start').on('click',function(){
    changjing();
  })
  $('#return').on('click',function(){
     window.location.reload();
  })
qipan();
})
