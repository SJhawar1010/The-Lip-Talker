document.addEventListener("DOMContentLoaded", () => {
    let langOption = document.querySelector('select'); 
    let fromText = document.querySelector('.fromText');
    let transText = document.querySelector('.toTranslate');
    let fromVoice = document.querySelector('.from');
    let toVoice = document.querySelector('.to');
    let translateButton = document.getElementById('translateButton');

    if (!langOption) {
        console.warn('No <select> element found.');
        return;
    }

    for (let countryCode in language) {
        let selected = (countryCode === "bn-IN") ? "selected" : ""; 
        let option = `<option value="${countryCode}" ${selected}>${language[countryCode]}</option>`;
        langOption.insertAdjacentHTML('beforeend', option);
    }

    translateButton.addEventListener('click', function(event) {
        event.preventDefault(); 

        let fromLang = "en-GB";

        let content = fromText.value;
        console.log('Input content:', content);

        let toLang = langOption.value;
        console.log('To Language:', toLang);

        if (!toLang) {
            console.error('Failed to retrieve the target language value.');
            return;
        }

        let translink = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(content)}&langpair=${fromLang}|${toLang}`;

        fetch(translink)
            .then(response => response.json())
            .then(data => {
                if (data.responseData) {
                    transText.value = data.responseData.translatedText;
                } else {
                    console.error('No translation data found.');
                }
            })
            .catch(error => {
                console.error('Error during translation:', error);
            });
    });

    fromVoice.addEventListener('click', function() {
        let fromTalk = new SpeechSynthesisUtterance(fromText.value);
        fromTalk.lang = "en-GB"; 
        speechSynthesis.speak(fromTalk);
    });

    toVoice.addEventListener('click', function() {
        let toTalk = new SpeechSynthesisUtterance(transText.value);
        toTalk.lang = langOption.value;
        speechSynthesis.speak(toTalk);
    });
});
