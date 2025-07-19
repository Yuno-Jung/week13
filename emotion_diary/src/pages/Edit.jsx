import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useContext, useEffect, useState } from "react"
import { DiaryDispatchContext, DiaryStateContext } from "../App"
import DiaryItem from '../components/DiaryItem';
import useDiary from "../hooks/useDiary"

const Edit = () => {
    // useParams : 리액트 라우터의 URL 파라미터를 불러오는 Hook
    // params라는 객체로 받아옴
    const params = useParams();
    const nav = useNavigate();
    const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
    
    const curDiaryItem = useDiary(params.id);

    const onClickDelete = () => {
        if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요")
        ) {
            // 일기 삭제 로직
            // App.jsx에서 onDelete 함수의 인수로 id를 받고 있기 때문
            onDelete(params.id);
            nav("/", {replace: true});
        }
    }

    // const getCurrentDiaryItem = () => {
    //     const currentDiaryItem = data.find(
    //         (item) => String(item.id) === String(params.id)
    //     )

    //     if(!currentDiaryItem) {
    //         window.alert("존재하지 않는 일기입니다.")
    //         nav("/", {replace: true});
    //     }

    //     return currentDiaryItem;
    // }

    // 컴포넌트가 리렌더링 될 때마다 return 문 위에서 getCurrentDiaryItem()을 호출하고 그 결과값을 변수에 담아줌
    // currnetDiaryItem 변수에는 현재 일기 아이템의 data가 들어옴
    // const currentDiaryItem = getCurrentDiaryItem();
    // console.log(currentDiaryItem)

    const onSubmit = (input) => {
        if (
            window.confirm("일기를 정말 수정할까요?")
        ) {
            // Editor 컴포넌트의 input state의 createdDate 값은 데이트 객체이기 때문에 타임 스탬프로 변환
            onUpdate(params.id, input.createdDate.getTime(), input.emotionId, input.content);
            nav('/',{replace: true})
        }
    }

    return  (
        <div>
            <Header title={"일기 수정하기"} leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />} rightChild={<Button onClick={onClickDelete} text={"삭제하기"} type={"NEGATIVE"} />} />
            <Editor initData={curDiaryItem} onSubmit={onSubmit} />
        </div>
    )
}

export default Edit;