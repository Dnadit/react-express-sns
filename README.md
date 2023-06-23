# SNS 만들기
![프로젝트시연](./videos/demoWeb.gif)

- 배포주소접속(http://dnaditsns.duckdns.org/)
## 목차
- [1. 실행 순서](#실행-순서)
- [2. 개발 환경](#개발환경)
- [3. 구현한 기능들](#구현완료)
- [4. 배포과정](#배포과정)

## 실행 순서
1. Nodejs18 설치
2. DB(MySql8) 사용자 생성 및 권한부여
    ```bash
    $ sudo mysql -u root -p
    mysql> CREATE USER 'nodejs'@'localhost' IDENTIFIED BY 'tiger';
    mysql> GRANT ALL PRIVILEGES ON 'react-express-sns'.* TO 'nodejs'@'localhost' IDENTIFIED BY 'tiger';
    mysql> exit;
    ```
3. 소스코드 클론 & pm2 설치
    ```bash
    $ git clone https://github.com/dnadit/react-express-sns
    $ sudo npm i -g pm2
    ```

4. client,server directory에 npm install    
    ```bash
    $ cd client
    $ npm i
    $ cd server
    $ npm i
    ```

5. 실행
    ```bash
    $ cd server
    $ npx sequelize db:create --env production
    $ npm start
    ```

## 개발환경
- Nodejs 18
- MySql 8
- Visual Studio Code

## 핵심 라이브러리
- React
- express
- sequelize
- passport
- recoil

## 구현완료
### 로그인, 회원가입
- [x] 회원가입
    - [x] 닉네임 중복확인
    - [x] 비밀번호를 두번 입력받아 일치하는지 확인
    - [x] 비밀번호 암호화
- [x] 프로필에서 닉네임, 비밀번호 수정
- [x] 회원탈퇴
    - [x] 회원 데이터 삭제

### 글
- [x] 내가 올린 글만 모아서 볼 수 있음
- [x] 글 수정, 삭제 가능
- [ ] Markdown 기반으로 작성 가능 => tailwindcss와 충돌이 있어 css가 제대로 만들어지지 않는것으로 보임..

### 댓글
- [x] 비로그인 상태에서는 댓글 입력창이 보이지 않고, 남겨진 댓글만 보임
- [x] 로그인 한 후 댓글창 위에 댓글 입력창 생성
- [x] 본인이 남긴 댓글은 삭제 가능

## 구현예정
### 카카오로그인(OAuth2.0)

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

## 배포과정
- aws(Lightsail): 최대한 빠르게 배포를 하기 위해서 Nodejs가 설치 되어 있고 사용자입장에서 기타 네트워크 등 설정이 최소화 되어 있는 Lightsail을 선정하여 배포 하였음.
- DB는 MySql을 사용하였는데 배포과정을 단순화하기 위해 Lightsail 인스턴스에 MySql을 설치하였음.
- 배포 후 ip주소와 dns를 cors설정에 추가하였음.

## LICENSE
MIT License

Copyright (c) 2023 Dnadit

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
