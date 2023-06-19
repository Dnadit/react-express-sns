# SNS 만들기

## 개발환경
- Nodejs 18
- React 18
- MySql 8
- Visual Studio Code

## 핵심 라이브러리
- express
- sequelize
- passport
- recoil

## 구현예정
### 로그인, 회원가입
- [x] 회원가입
    - [x] 닉네임 중복확인
    - [x] 비밀번호를 두번 입력받아 일치하는지 확인
    - [x] 비밀번호 암호화
- [ ] 프로필에서 닉네임, 비밀번호 수정
- [ ] 회원탈퇴
    - [ ] 회원 데이터 삭제

### 글
- [ ] 내가 올린 글만 모아서 볼 수 있음
- [ ] 글 수정, 삭제 가능
- [ ] Markdown 기반으로 작성 가능

### 댓글
- [ ] 로그인 한 상태에서는 댓글 입력창이 보이지 않고, 남겨진 댓글만 보임
- [ ] 로그인 한 후 댓글창 위에 댓글 입력창 생성
- [ ] 본인이 남긴 댓글은 삭제 가능

### 좋아요
- [ ] 비회원일 때에는 팝업창에서 좋아요 확인
    - [ ] 메인 페이지에서는 좋아요 숨김
    - [ ] 개별 페이지에서 좋아요 보임
    - [ ] 비회원의 경우, 로그인 안내 메세지 출력
- [ ] 로그인 후 메인, 팝업창에서 좋아요 누르기 가능
- [ ] 좋아요 누르면 좋아요를 곧바로 반영

### 페이지네이션
- [ ] 한 페이지의 최대 페이지수는 5로 구현
- [ ] 페이지 수에 따라 이전, 다음 버튼 생성 구현

## LICENSE
MIT License

Copyright (c) 2023 Dnadit

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
