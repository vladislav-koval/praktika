import React from "react";

const Footer = props => {
    return (
        <footer className="footer">
            <div className="footer__container">
                По всем интересующим вопросам обращайтесь:
                <p>Директор ООО «ЦАЭСКО»: Карманов Антон Сергеевич</p>
                <p>Тел: </p>
                <p>
                    Эл.адрес:&nbsp;
                    <a href="mailto:info@czaesko.ru">info@czaesko.ru</a>,&nbsp;
                    <a href="mailto:czaesko@mail.ru">czaesko@mail.ru</a>
                </p>
            </div>
        </footer>
    );
}

export default Footer;