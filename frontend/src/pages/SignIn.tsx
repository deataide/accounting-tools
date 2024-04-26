import useAuth from "@/hooks/useAuth";
import { Input } from "@/shadcn/@components/ui/input";
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from "react-hook-form";

type LoginInputs = {
  email: string;
  password: string;
};

export default function SignIn() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInputs>();
  const navigate = useNavigate();
  const auth = useAuth();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      const isAValidEmail = emailRegex.test(data.email)
      if(!isAValidEmail) return console.error('Type a valid e-mail')
       await auth.authenticate(data.email, data.password);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-row align-middle justify-center">
      {/* Lado esquerdo */}
      <div className="hidden sm:flex flex-1 bg-yellow-400 justify-center items-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Accounting Tools</h1>
        </div>
      </div>

      {/* Lado direito */}
      <div className="flex flex-col w-full min-h-screen sm:w-2/6 bg-slate-50-100 p-8 justify-center align-middle">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">Hello!</h1>
        </div>

        {/* Formulário de login */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h2 className="text-xl font-semibold mb-4">Login to your account</h2>
            <div className="mb-4">
              {/* Campo de e-mail */}
              <Input type="email" placeholder="E-mail..." required {...register("email")} />
            </div>
            <div className="mb-4">
              {/* Campo de senha */}
              <Input type="password" placeholder="Password..." required {...register("password")} />
            </div>
            <div className="text-right mb-4">
              {/* Link de esqueceu a senha */}
              <span className="text-sm text-blue-600 cursor-pointer">Forget password?</span>
            </div>
            {/* Botão de enviar */}
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" type="submit">Enter</button>
          </div>
        </form>
      </div>
    </div>
  );
}
