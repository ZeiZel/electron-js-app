// Импорт через деструктуризацию определённых компонентов в систему
const { app, BrowserWindow } = require("electron");
const path = require("path");

// Эта функция создаёт браузерное окно из импортированного модуля
function createWindow() {
	// создаём инстанс окна
	const win = new BrowserWindow({
		width: 1200,
		height: 800,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	});

	// в окно загружается файл с нашим html-файлом
	win.loadFile("index.html");

	// откроет окно разработчика при запуске программы
	win.webContents.openDevTools();
}

// эта функция запускает окно нашего браузера, когда приложение загрузилось
app.whenReady().then(() => {
	createWindow();

	// Эта настройка предназначена для macOS, чтобы запускать новое окно, когда все окна закрыты
	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

// когда все окна приложения закрыты необходимо сделать что-то - выйти из приложения
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit(); // выход из системы
	}
});
