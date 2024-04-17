import { useState} from "react"

const Login = () => {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword]  = useState("")
    const [isLogged, setIsLogged] = useState(true)
    const [showLoginAlert, setShowLoginAlert] = useState(<div></div>)
    // validação de e-mail
    const checkEmail = () => {
      const emails = ['@gmail.com', '@outlook.com', '@hotmail.com']
      let isEmailValid = false
      for (let i = 0; i < emails.length; i++) {
          if (email.includes(emails[i]) && email !== '') {
              isEmailValid = true
              
              break
          }
      }
      if (isEmailValid) {
          return true
      } 
          return false
      
  }
  // validação de senha
  const checkPassword = () => {
      const dividedPass = password.split('')
      if (dividedPass.length >= 6) {
          
          return true
      } else {
          return false
      }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkEmail()) {
        if (checkPassword() ) {
            setIsLogged(true)
            setShowLoginAlert(<div>Logged with success!</div>)
        } else {
            setIsLogged(false)
            setShowLoginAlert(null)
        }
    }else{
        setIsLogged(false)
    }
    console.log("Form submitted!")
}

  return (
    <div className="min-h-screen flex justify-center items-center text-4xl bg-gradient-to-br from-black to-blue-500 ">
        <div className=" bg-white p-8 rounded-lg shadow-md h-100">
            <h2 className=" text-2x1 font-semibold">Login form 🐞</h2>
        <form 
            className="flex flex-col items-center"
            onSubmit={handleSubmit}
        >
          <div className="text-red-500 font-bold" style={{ display: isLogged ? 'none' : 'block' }}>E-MAIL OR PASSWORD WRONG.</div>
        <label className="mb-4 w-full">
            <span className="block mb-1" >E-mail </span>
            <input
                className="border border-gray-400 rounded-md px-4 py-2"
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value)
                    checkEmail()
                    
                }}
            >
            </input> 
        </label>
        <label className="mb-4 w-full">
            <span className="block mb-1">Password </span>
            <input
                className="border border-gray-400 rounded-md px-4 py-2"
                type="password"
                name="password"
                required
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value)
                    checkPassword()
                    
                }}
            >
            </input> 
        </label>
        <button 
        className="bg-blue-700 flex text-white font-bold py-2 px-4 rounded "
        onClick={handleSubmit}
        style={{
          display: email === '' ? 'none' : 'inline-block'
        }}
        >Login
        </button>
      </form>
      </div>
      <div className="fixed bottom-0 left-0 bg-green-500 text-white login-alert-large rounded font-bold">
      {showLoginAlert}
      </div>
    </div>
    
  )
}

export default Login