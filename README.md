# workWithPrinter
Student task for laboratory work

# Зависимости

Приложение написанно с помощью NiceLabel .NET framework 2019 поэтому для его корректной нужно установить данную библиотеку <https://www.nicelabel.com/downloads/nicelabel>
приложение разработанно на основе бесплатной демо-версии.

# Описание проекта

Программа условно поделена на 3 части. 
* Класс написанный на C# .NET framework версии 4.7.2, который реализует работу с библиотекой NiceLabel.
* Класс реализующий веб API для управления предыдущим классом из браузера. Написан на той же версии .NET framework 4.7.2.
* Сам клиент написанный на стандартных для веба языках html, js, css без использования фреймворков.

# Правила запуска

Для запуска программы требуется: 
* Cкомпилировать и запустить проект webPrinter.sln.
* Запустить index.html из папки ./client/public.

# Дополнительная информация 
Все существующие шаблоны для создания этикеток находятся в папке ./samples
Так же есть возможнось создания дополнительных шаблонов, их нужно ппомещать в туже папку, шаблон должен быть файлом с расширением .nlbl

# Недостатки программы
* На данном этапе клиент не работает просто так из-за CORS политики. Возможно решением будет на корневой GET запрос отправлять все файлы для клиента, но из-за малых знаний в области серверов на C# не смог в заданные сроки решить данную проблему
* При нажатии кнопки печати запрос на сервер не приходит. Не знаю с чем это связанно, при запросе в ручную все работает, но все равно грешу на сервер т.к. опять же, не имею опыта в разработке сервером на С#
* Почти нет обработчиков ошибок. Самая извесная проблема с кнопкой печати, стоит проверить наличие текста в полях для ввода данных и что выбран принтер на котором производится печать.
