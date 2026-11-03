"use client"
import { useState, useEffect } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    id: 'test',
    nickName: 'haha',
    password: '',
    passwordCheck: ''
  });
  console.log("RENDER:", person.nickName);
  function handleIdChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPerson((prev) => ({
      ...prev,
      id: e.target.value
    }));
  }

  function handleNickNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log("이벤트 값:", e.target.value);
    setPerson((prev) => ({
      ...prev,
      nickName: e.target.value
    }));
    console.log("person 값:", person.nickName);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPerson((prev) => ({
      ...prev,
      password: e.target.value
    }));
  }
  function handlePasswordCheckChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPerson((prev) => ({
      ...prev,
      passwordCheck: e.target.value
    }));
  }
  // Submit 버튼 클릭 시 실행
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // 페이지 새로고침 방지

    if (person.password !== person.passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 서버로 전송할 데이터
    const { passwordCheck, ...submitData } = person;

    console.log('전송할 회원정보:', submitData);

    // 실제 API 전송 코드는 여기에 추가
    alert('회원정보가 전송되었습니다.');

  }


  return (
    <div className='bg-[var(--background)] m-auto flex flex-col p-10 shadow-xl'>
      <form onSubmit={handleSubmit}>
        <h1 className='mb-4 text-xl font-bold'>회원정보 수정</h1>
        <label>
          아이디
          <input
          className='border p-2 mb-2  ml-2 disabled:opacity-60'
            value={person.id}
            onChange={handleIdChange}
            disabled
          />
        </label>
        <label>
          닉네임
          <input
          className='border p-2 mb-2 ml-2'
            value={person.nickName}
            onChange={handleNickNameChange}
          />
        </label>
        <label>
          비밀번호
          <input
            type="password"
            className='border p-2 mb-2 ml-2'
            value={person.password}
            onChange={handlePasswordChange}
          />
        </label>
        <label>
          비밀번호 확인
          <input
            type="password"
            className='border p-2 mb-2 ml-2'
            value={person.passwordCheck}
            onChange={handlePasswordCheckChange}
          />
        </label>
        <button type="submit" className="w-100 mt-4 rounded bg-blue-600 p-2 text-white hover:bg-blue-700" > 회원정보 수정 </button>
      </form>
    </div>
  );
}