import RegisterFormDashboard from "../../components/auth/RegisterFormDashboard";

export default function RegisterUserDashboard() {
  return (
    <div
    className="flex-1 h-full flex flex-col"
    >
      <h3
      className="text-2xl font-semibold text-gray-800 dark:text-white mb-6"
      >
        Registra a un tecnico
      </h3>
      <RegisterFormDashboard />
    </div>
  )
}