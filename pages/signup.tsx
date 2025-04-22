import { useState } from 'react';
import { supabase } from '@/utils/supabase';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      setMessage(`가입 실패: ${error.message}`);
    } else {
      setMessage('가입 성공! 이메일을 확인해주세요.');
    }
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>회원가입</h1>
      <input placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="비밀번호" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup}>가입하기</button>
      {message && <p>{message}</p>}
    </main>
  );
}
