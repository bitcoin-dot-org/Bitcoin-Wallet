export default class Utils {
    static languageBigName(l : string) : string {
        if (l == "en") {
          return 'English'
        }
    
        else if (l == "es") {
          return 'Español'
        }
    
        else if (l == "fr") {
          return 'Français'
        }
        
        else if(l == "ja") {
          return '日本語'
        }

        else if(l == "it") {
          return 'Italiano'
        }
        
        else if(l == "ca") {
           return 'Catalan'
        }

        else if(l == "pt-br") {
          return 'Português Brasil'
        }
    
        else {
          return 'English'
        }
      }
    
      static languageShortCode(l : string) : string {
    
        if (l == "English") {
          return 'en'
        }
    
        else if (l == "Español") {
          return 'es'
        }
    
        else if (l == "Français") {
          return 'fr'
        }
        
        else if(l == "日本語") {
          return 'ja'
        }

        else if(l == "Italiano") {
          return 'it'
        }
        
        else if(l == "Catalan") {
           return 'ca'
        }

        else if(l == 'Português Brasil') {
          return 'pt-br'
        }
    
        else {
          return 'en'
        }
    
      }
}