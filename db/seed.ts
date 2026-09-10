import { config } from "dotenv";
import { eq } from "drizzle-orm";
import { getDb } from "../lib/db";
import { quizzes } from "./schema";

config({ path: ".env.local" });

const quizSeeds = [
  ["css-width-reflow", "CSS", "리플로우", "중급", "width를 바꿨더니 레이아웃 전체가 밀렸습니다", "상품 카드의 width를 바꾼 뒤 옆에 있던 요소까지 아래로 밀렸습니다.", "width 변경이 왜 레이아웃 전체에 영향을 주는지, 브라우저에서 어떤 계산이 다시 일어나는지 설명해주세요.", ".card { width: 420px; }"],
  ["css-absolute-context", "CSS", "포지셔닝 컨텍스트", "중급", "absolute 요소가 엉뚱한 곳에 붙습니다", "배지를 카드 오른쪽 위에 붙이려고 했지만 화면 전체의 오른쪽 위에 나타납니다.", "absolute 요소의 기준점은 어떻게 정해지며, 카드에 무엇을 추가해야 하는지 설명해주세요.", ".badge { position: absolute; top: 0; right: 0; }"],
  ["css-overflow-hidden", "CSS", "오버플로우", "초급", "부모에 overflow: hidden을 줬더니 자식이 사라졌습니다", "드롭다운 메뉴가 열리지만 카드 바깥으로 나가는 순간 잘려 보이지 않습니다.", "overflow: hidden이 자식 요소에 어떤 영향을 주는지, 해결 방법은 무엇인지 설명해주세요.", ".card { overflow: hidden; }"],
  ["css-specificity", "CSS", "명시도", "초급", "같은 버튼인데 색이 다르게 적용됩니다", "두 버튼에 같은 클래스를 붙였는데 한 버튼만 다른 색으로 보입니다.", "CSS 명시도가 무엇이고 어떤 선택자가 우선되는지 설명해주세요.", ".button { color: blue; }\n#submit { color: red; }"],
  ["css-margin-collapse", "CSS", "마진 콜랩싱", "중급", "margin이 겹쳐 예상보다 간격이 좁습니다", "두 블록에 각각 margin-top과 margin-bottom을 줬는데 간격이 두 값의 합보다 작습니다.", "마진 콜랩싱이 발생하는 조건과 피하는 방법을 설명해주세요.", ".title { margin-bottom: 24px; }\n.description { margin-top: 16px; }"],
  ["js-event-loop", "JavaScript", "이벤트 루프", "중급", "setTimeout(fn, 0)인데 바로 실행되지 않습니다", "동기 로그 다음에 setTimeout을 0초로 설정했지만 콜백 로그가 나중에 출력됩니다.", "setTimeout(fn, 0)이 즉시 실행되지 않는 이유와 이벤트 루프의 역할을 설명해주세요.", "console.log('A');\nsetTimeout(() => console.log('B'), 0);\nconsole.log('C');"],
  ["js-event-bubbling", "JavaScript", "이벤트 버블링", "초급", "버튼을 클릭했더니 부모 이벤트까지 실행됩니다", "카드 안의 버튼을 눌렀는데 카드 클릭 핸들러도 함께 실행됩니다.", "이벤트 버블링이 무엇인지, 부모 핸들러 실행을 막는 방법을 설명해주세요.", "card.addEventListener('click', openCard);\nbutton.addEventListener('click', addItem);"],
  ["js-closure-scope", "JavaScript", "클로저와 스코프", "중급", "for문 안 var 때문에 모든 버튼이 같은 값을 보여줍니다", "세 버튼을 만들었지만 어떤 버튼을 눌러도 마지막 숫자만 출력됩니다.", "var와 let의 스코프 차이, 그리고 이 현상이 클로저와 어떤 관련이 있는지 설명해주세요.", "for (var i = 0; i < 3; i++) {\n  button.onclick = () => console.log(i);\n}"],
  ["js-promise-async", "JavaScript", "Promise와 async/await", "초급", "API 호출 결과가 undefined로 찍힙니다", "fetch를 호출했지만 콘솔에 원하는 데이터 대신 Promise나 undefined가 표시됩니다.", "fetch의 비동기 처리 순서와 async/await 또는 then을 사용한 해결 방법을 설명해주세요.", "const data = fetch('/api/items').json();\nconsole.log(data);"],
  ["js-shallow-deep-copy", "JavaScript", "얕은 복사와 깊은 복사", "중급", "배열을 복사했는데 원본까지 바뀝니다", "복사한 배열의 객체 속성을 수정했더니 원본 배열의 객체도 함께 변경됩니다.", "참조가 복사되는 이유와 얕은 복사/깊은 복사의 차이를 설명해주세요.", "const copy = [...items];\ncopy[0].name = 'new name';"],
  ["html-alt", "HTML", "웹 접근성", "초급", "이미지가 안 보이는 환경에서 내용을 알 수 없습니다", "이미지를 볼 수 없는 사용자가 페이지의 상품 정보를 이해하지 못합니다.", "img 요소의 alt 속성이 왜 필요한지, 좋은 대체 텍스트는 어떤 것인지 설명해주세요.", "<img src=\"product.png\">"],
  ["html-semantic-button", "HTML", "시맨틱 태그와 포커스", "초급", "div로 만든 버튼이 키보드로 눌리지 않습니다", "마우스로는 클릭되지만 Tab 키로 이동하거나 Enter로 실행할 수 없습니다.", "div 대신 button을 사용해야 하는 이유와 키보드 접근성을 확보하는 방법을 설명해주세요.", "<div class=\"button\" onclick=\"submit()\">제출</div>"],
  ["html-form-default", "HTML", "form 기본 동작", "초급", "폼 제출 후 새로고침되어 값이 사라집니다", "제출 버튼을 누르면 페이지가 새로고침되어 화면에 표시하던 결과가 사라집니다.", "form의 기본 제출 동작이 무엇이며 preventDefault를 언제 사용하는지 설명해주세요.", "form.addEventListener('submit', () => showResult());"],
  ["html-viewport", "HTML", "반응형과 viewport", "초급", "모바일에서 레이아웃이 데스크톱처럼 축소됩니다", "모바일 화면에서 글자와 버튼이 너무 작고 레이아웃이 한쪽으로 치우칩니다.", "viewport 메타 태그가 모바일 레이아웃에 어떤 역할을 하는지 설명해주세요.", "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">"],
  ["web-repaint-reflow", "Web basic", "리페인트와 리플로우", "중급", "스크롤할 때마다 페이지가 버벅입니다", "스크롤 이벤트에서 요소의 크기와 위치를 반복해서 읽고 바꾸고 있습니다.", "리페인트와 리플로우의 차이, 스크롤 성능을 개선하는 방법을 설명해주세요.", "window.addEventListener('scroll', () => {\n  box.style.top = window.scrollY + 'px';\n});"],
  ["web-cls", "Web basic", "CLS", "중급", "이미지 로딩 전에 레이아웃이 계속 밀립니다", "이미지가 로드될 때마다 아래 콘텐츠가 갑자기 내려갑니다.", "Cumulative Layout Shift가 발생하는 이유와 이미지 레이아웃을 안정화하는 방법을 설명해주세요.", "<img src=\"hero.jpg\">"],
  ["web-rerendering", "Web basic", "리렌더링", "중급", "콘솔에 같은 함수가 여러 번 찍힙니다", "버튼 하나를 눌렀을 뿐인데 컴포넌트의 로그가 여러 번 출력됩니다.", "리렌더링이 발생하는 조건과 렌더링 중 부수 효과를 실행하면 안 되는 이유를 설명해주세요.", "function App() {\n  console.log('render');\n  return <Button />;\n}"],
  ["web-csr-ssr", "Web basic", "CSR과 SSR", "초급", "새로고침 없이 화면이 바뀝니다", "링크를 눌렀는데 브라우저 전체가 새로고침되지 않고 일부 화면만 바뀝니다.", "CSR과 SSR의 차이, 각각의 렌더링 시점과 장단점을 설명해주세요.", "<a href=\"/profile\">프로필</a>"],
  ["web-https", "Web basic", "HTTPS와 보안", "초급", "HTTP 사이트에서 브라우저 경고가 뜹니다", "주소창에 안전하지 않다는 경고가 표시되고 사용자가 입력한 정보가 걱정됩니다.", "HTTP와 HTTPS의 차이, TLS가 보호하는 대상을 설명해주세요.", "http://example.com/login"],
  ["web-cache", "Web basic", "브라우저 캐싱", "중급", "캐시를 지웠더니 사이트가 이상하게 보입니다", "CSS 캐시를 삭제한 뒤 오래된 HTML과 새 CSS가 섞인 것처럼 화면이 깨집니다.", "브라우저 캐시가 무엇이며 캐시 무효화와 버전이 붙은 정적 파일이 왜 필요한지 설명해주세요.", "<link rel=\"stylesheet\" href=\"/styles.css\">"],
] as const;

async function seed() {
  const db = getDb();
  for (const [slug, category, topic, difficulty, title, context, prompt, code] of quizSeeds) {
    const existing = await db.select({ id: quizzes.id }).from(quizzes).where(eq(quizzes.slug, slug));
    if (existing.length === 0) {
      await db.insert(quizzes).values({ slug, category, topic, difficulty, title, context, prompt, code });
    }
  }
  console.log(`Seeded ${quizSeeds.length} scenario quizzes.`);
}

seed().catch((error) => { console.error(error); process.exit(1); });