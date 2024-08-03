import { signIn } from 'next-auth/react';
import IconLockDots from '@/components/icon/icon-lock-dots';
import IconMail from '@/components/icon/icon-mail';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { showMessage } from '@/utils/notification';
// import Tabs from '../Reusable/Tabs/Tabs';

const ComponentsAuthLoginForm = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // useEffect(() => {
    //     // Check for error in URL when component mounts or URL changes
    //     const errorMessage = router.query.error;
    //     if (errorMessage) {
    //         setError(decodeURIComponent(errorMessage as string));
    //     }
    // }, [router]);

    const submitForm = async (e: any) => {
        // console.log('test');
        e.preventDefault();
        // router.push('/');

        try {
            const result = await signIn('local', {
                email,
                password,
                redirect: false,
            });
            console.log('res: ', result);
            if (result?.error) {
                // Handle error
                console.log(result.code);
                showMessage(result.code, 'error');
            } else {
                router.replace('/');
            }
        } catch (error) {
            console.error('SignIn exception:', error);
        }
    };

    return (
        <>
            <form className="space-y-5 dark:text-white" onSubmit={submitForm}>
                <div>
                    <label htmlFor="Email">Email</label>
                    <div className="relative text-white-dark">
                        <input
                            id="Email"
                            type="email"
                            placeholder="Enter Email"
                            className="form-input ps-10 placeholder:text-white-dark"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                            <IconMail fill={true} />
                        </span>
                    </div>
                </div>
                <div>
                    <label htmlFor="Password">Password</label>
                    <div className="relative text-white-dark">
                        <input
                            id="Password"
                            type="password"
                            placeholder="Enter Password"
                            className="form-input ps-10 placeholder:text-white-dark"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                            <IconLockDots fill={true} />
                        </span>
                    </div>
                </div>
                <div>
                    <label className="flex cursor-pointer items-center justify-end">
                        {/* <input type="checkbox" className="form-checkbox bg-white dark:bg-black" /> */}
                        <a href="/" className="text-white-dark">
                            Forget Password ?
                        </a>
                    </label>
                </div>
                <button type="submit" className="btn !mt-6 w-full border-0 bg-gradient-to-r from-[#005fbe] to-[#2eb9ff] uppercase text-white shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                    Sign in
                </button>
            </form>
        </>
    );
};

export default ComponentsAuthLoginForm;
