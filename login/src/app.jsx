const {
  ShellC,
  BodyChoice,
  BodyCompany,
  BodyUser,
  BodyInvite,
  BodyTerms,
  BodyComplete,
} = window;

const FLOW_COPY = {
  choice: {
    title: '소속된 회사가 있으신가요?',
    subtitle: '이미 등록된 회사에 합류하거나, 새 회사를 등록할 수 있어요.',
  },
  company: {
    title: '회사 정보를 입력해 주세요',
    subtitle: '관리자가 가입 승인을 검토할 때 사용되는 정보예요. 정확하게 입력해 주세요.',
  },
  invite: {
    title: '회사 코드를 입력해 주세요',
    subtitle: '관리자에게 받은 8자리 회사 코드를 입력하면 회사에 합류할 수 있어요.',
  },
  user: {
    title: '유저 정보를 입력해 주세요',
    subtitle: '관리자 승인 후 사용할 계정 정보예요.',
  },
  terms: {
    title: '약관을 확인해 주세요',
    subtitle: '아래 내용을 끝까지 확인한 뒤 동의해야 회원가입 신청을 완료할 수 있어요.',
  },
  completeNew: {
    title: '회원가입 신청이 완료되었습니다.',
    subtitle: <>
      승인 여부는 메일로 안내되니 메일함을 확인해 주세요.
    </>,
  },
  completeExisting: {
    title: '회원가입 신청이 완료되었습니다.',
    subtitle: <>
      승인 여부는 메일로 안내되니 메일함을 확인해 주세요.
    </>,
  },
};

function App() {
  const [path, setPath] = React.useState(null);
  const [step, setStep] = React.useState(1);
  const activePath = path || 'new';

  const goBack = () => setStep((current) => Math.max(1, current - 1));
  const goNext = () => setStep((current) => Math.min(5, current + 1));

  let copy = FLOW_COPY.choice;
  let wide = false;
  let centered = false;
  let contentMaxWidth = null;
  let body = (
    <BodyChoice
      active={path}
      onSelect={setPath}
      onNext={() => path && goNext()}
    />
  );

  if (step === 2 && activePath === 'new') {
    copy = FLOW_COPY.company;
    wide = true;
    contentMaxWidth = 640;
    body = <BodyCompany onBack={goBack} onNext={goNext}/>;
  }

  if (step === 2 && activePath === 'existing') {
    copy = FLOW_COPY.invite;
    body = <BodyInvite onBack={goBack} onNext={goNext}/>;
  }

  if (step === 3) {
    copy = FLOW_COPY.user;
    body = <BodyUser onBack={goBack} onNext={goNext}/>;
  }

  if (step === 4) {
    copy = FLOW_COPY.terms;
    wide = true;
    contentMaxWidth = 700;
    body = <BodyTerms onBack={goBack} onNext={goNext}/>;
  }

  if (step === 5) {
    centered = true;
    copy = activePath === 'new' ? FLOW_COPY.completeNew : FLOW_COPY.completeExisting;
    body = <BodyComplete path={activePath}/>;
  }

  return (
    <ShellC
      path={activePath}
      step={step}
      title={copy.title}
      subtitle={copy.subtitle}
      wide={wide}
      centered={centered}
      contentMaxWidth={contentMaxWidth}
    >
      {body}
    </ShellC>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
