import React from "react";

import {
  faLocationDot,
  faClock,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useBaseUrl from "@docusaurus/useBaseUrl";

function CourseInfos(): JSX.Element {
  return (
    <div className="w-4/5 my-14 mx-auto">
      <h2 className="text-2xl font-bold">课程信息</h2>

      <div className="bg-white w-4/5 mx-auto mt-5 mb-1 rounded-lg shadow-2xl text-center">
        <div className="indent-9 text-left p-5 font-normal text-lg">
          <p>
            《数据库应用训练》是一门信息与计算科学专业的专业实践课程，要求针对某个给定的数据库应用问题，
            全面运用前期课程所学知识，从系统需求分析着手，进行数据库应用系统的设计、实现，撰写报告及答辩汇报。
          </p>
          <p>
            通过《数据库应用训练》课程，巩固并提高学生对关系数据库的实际运用能力；
            加深对数据库系统、程序设计理论知识的理解和应用水平；
            通过设计实际的数据库应用系统，进一步熟悉数据库管理系统的操作技术，提高动手能力以及分析问题和解决问题的能力；
            课程设计按小组形式进行，增强学生的团队协作和组织沟通能力，帮助学生树立系统观和全局观，养成严谨的工作作风。
          </p>

          <p className="text-orange-500 font-bold">
            请在课程开始前仔细阅读
            <a href={useBaseUrl("/basic/prelearn")}>预学习</a>
            的内容，并搭建Web前后端开发环境。
          </p>
        </div>
      </div>
    </div>
  );
}

export default CourseInfos;
