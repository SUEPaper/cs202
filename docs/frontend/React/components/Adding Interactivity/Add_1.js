import React, { useState } from "react";

export function Button2_1_1() {
    return (
      <button>
        未绑定任何事件
      </button>
    );
  }



export function Button2_1_2() {
  function handleClick() {
    alert('你点击了我！');
  }

  return (
    <button onClick={handleClick}>
      点我
    </button>
  );
}



function AlertButton2_1_3({ message, children }) {
    return (
      <button onClick={() => alert(message)}>
        {children}
      </button>
    );
  }
  
  export function Toolbar2_1_3() {
    return (
      <div>
        <AlertButton2_1_3 message="正在播放！">
          播放电影
        </AlertButton2_1_3>
        <AlertButton2_1_3 message="正在上传！">
          上传图片
        </AlertButton2_1_3>
      </div>
    );
  }



  function Button2_1_4({ onClick, children }) {
    return (
      <button onClick={onClick}>
        {children}
      </button>
    );
  }
  
  function PlayButton2_1_4({ movieName }) {
    function handlePlayClick2_1_4() {
      alert(`正在播放 ${movieName}！`);
    }
  
    return (
      <Button2_1_4 onClick={handlePlayClick2_1_4}>
        播放 "{movieName}"
      </Button2_1_4>
    );
  }
  
  function UploadButton2_1_4() {
    return (
      <Button2_1_4 onClick={() => alert('正在上传！')}>
        上传图片
      </Button2_1_4>
    );
  }
  
  export function Toolbar2_1_4() {
    return (
      <div>
        <PlayButton2_1_4 movieName="魔女宅急便" />
        <UploadButton2_1_4 />
      </div>
    );
  }
  


  function Button2_1_5({ onSmash, children }) {
    return (
      <button onClick={onSmash}>
        {children}
      </button>
    );
  }
  
  export function App2_1_5() {
    return (
      <div>
        <Button2_1_5 onSmash={() => alert('正在播放！')}>
          播放电影
        </Button2_1_5>
        <Button2_1_5 onSmash={() => alert('正在上传！')}>
          上传图片
        </Button2_1_5>
      </div>
    );
  }



  export function App2_1_6() {
    return (
      <Toolbar2_1_6
        onPlayMovie={() => alert('正在播放！')}
        onUploadImage={() => alert('正在上传！')}
      />
    );
  }
  
  function Toolbar2_1_6({ onPlayMovie, onUploadImage }) {
    return (
      <div>
        <Button2_1_6 onClick={onPlayMovie}>
          播放电影
        </Button2_1_6>
        <Button2_1_6 onClick={onUploadImage}>
          上传图片
        </Button2_1_6>
      </div>
    );
  }
  
  function Button2_1_6({ onClick, children }) {
    return (
      <button onClick={onClick}>
        {children}
      </button>
    );
  }



  function Button2_1_7({ onClick, children }) {
    return (
      <button onClick={e => {
        e.stopPropagation();
        onClick();
      }}>
        {children}
      </button>
    );
  }
  
  export function Toolbar2_1_7() {
    return (
      <div className="Toolbar" onClick={() => {
        alert('你点击了 toolbar ！');
      }}>
        <Button2_1_7 onClick={() => alert('正在播放！')}>
          播放电影
        </Button2_1_7>
        <Button2_1_7 onClick={() => alert('正在上传！')}>
          上传图片
        </Button2_1_7>
      </div>
    );
  }



  export function Signup2_1_8() {
    return (
      <form onSubmit={() => alert('提交表单！')}>
        <input />
        <button>发送</button>
      </form>
    );
  }
  
  