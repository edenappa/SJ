// pages/index.tsx

import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import { initiateStripeCheckout } from '../lib/stripe';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [subscribed, setSubscribed] = useState(false);

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error && data.user) {
      setUser(data.user);
      checkSubscription(data.user);
    }
  };

  const checkSubscription = async (user: any) => {
    const { data } = await supabase
      .from('profiles')
      .select('subscriptionActive')
      .eq('id', user.id)
      .single();

    if (data?.subscriptionActive) {
      setSubscribed(true);
    }
  };

  const handleSubscribe = () => {
    initiateStripeCheckout(email);
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>SilentService / Shinji</h1>
      {!user ? (
        <div>
          <input placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input placeholder="비밀번호" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleSignIn}>로그인</button>
        </div>
      ) : (
        <div>
          <p>{user.email}님, 환영합니다.</p>
          {subscribed ? (
            <iframe
              src={process.env.NEXT_PUBLIC_SHINJI_GPT_URL}
              width="100%"
              height="600"
              style={{ border: '1px solid #444', marginTop: '1rem' }}
            />
          ) : (
            <div>
              <p>신지 공간에 접속하려면 구독이 필요합니다.</p>
              <button onClick={handleSubscribe}>신지 구독하기</button>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
