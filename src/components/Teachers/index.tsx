import React from "react";

import EarthImageUrl from "@site/static/img/Earth.jpeg";

function Teachers(): JSX.Element {
  return (
    <div className="w-4/5 my-14 mx-auto">
      <h2 className="text-2xl font-bold">授课老师</h2>

      <div className="bg-white w-4/5 mx-auto mt-5 mb-1 rounded-lg shadow-2xl text-center">
        <table className="mx-1 my-7">
          <thead>
            <tr className="border-t-0 border-b-2">
              <th className="border-0 bg-white w-64"></th>
              <th className="border-0 bg-white w-64">名字</th>
              <th className="border-0 bg-white w-64">办公室</th>
              <th className="border-0 bg-white w-64"> 邮箱</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-0">
              <td className="border-0 bg-white">
                <img
                  className="rounded-full max-w-20 max-h-20 object-cover"
                  src={EarthImageUrl}
                />
              </td>
              <td className="border-0 bg-white">冯莉</td>
              <td className="border-0 bg-white">临港B2楼A410室</td>
              <td className="border-0 bg-white">fengli@shiep.edu.cn</td>
            </tr>
            <tr className="border-0">
              <td className="border-0 bg-white">
                <img
                  className="rounded-full max-w-20 max-h-20 object-cover"
                  src={EarthImageUrl}
                />
              </td>
              <td className="border-0 bg-white">张开军</td>
              <td className="border-0 bg-white">临港B2楼A412室</td>
              <td className="border-0 bg-white">fdkk88@163.com</td>
            </tr>
            <tr className="border-0">
              <td className="border-0 bg-white">
                <img
                  className="rounded-full max-w-20 max-h-20 object-cover"
                  src={EarthImageUrl}
                />
              </td>
              <td className="border-0 bg-white">朱威</td>
              <td className="border-0 bg-white">临港B2楼A410室</td>
              <td className="border-0 bg-white">zhuwei_ok@126.com</td>
            </tr>
            <tr className="border-0">
              <td className="border-0 bg-white">
                <img
                  className="rounded-full max-w-20 max-h-20 object-cover"
                  src={EarthImageUrl}
                />
              </td>
              <td className="border-0 bg-white">胡妍</td>
              <td className="border-0 bg-white">临港B2楼A406室</td>
              <td className="border-0 bg-white">huyan12@shiep.edu.cn</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Teachers;
