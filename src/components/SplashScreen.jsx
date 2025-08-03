// src/components/SplashScreen.jsx

// Si usas public/assets/, no necesitas import

const SplashScreen = ({ isLoading, error }) => {
  // Si no está cargando, no renderizar nada
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white flex flex-col justify-center items-center z-50">
      {error ? (
        <div className="text-center text-red-600 p-5">
          <p className="text-lg mb-2">❌ {error}</p>
          <p className="text-sm text-gray-600">
            Verifica tu conexión e intenta nuevamente
          </p>
        </div>
      ) : (
        <div className="text-center flex flex-col items-center space-y-6">
          {/* Logo con animación */}
          <img 
            src="/assets/2_Mesa de trabajo 9.png" 
            alt="Contact Manager Logo" 
            className="w-32 h-auto max-w-52 animate-bounce drop-shadow-lg"
            onError={(e) => {
              console.error('Error cargando imagen:', e);
              e.target.style.display = 'none';
            }}
          />
          
          {/* Texto con animación */}
          <h2 className="text-2xl font-semibold text-gray-800 animate-pulse">
            📇 Iniciando Contact Manager...
          </h2>
          
          {/* Spinner de carga */}
          <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          
          {/* Barra de progreso opcional */}
          <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 animate-pulse"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SplashScreen;