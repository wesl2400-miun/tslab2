# Frontend-baserad webbutveckling
## Laboration 2 - Objektorienterad programmering

### Så här fungerar min lösning

Det finns en huvudvy TodoListV som visar listan av att-göra-uppgifter.
Denna uppdateras med hjälp av klassen App som håller en referens
till todo-listan från klassen TodoList. Vyn tar också hand om inmatningen
som kommer från addTodo-formuläret och uppdaterar todo-listan
när ny att-göra-uppgit skapas. Varje todo-listelement definieras
som en separat vy via klassen TodoV, vilken tillåter
användaren att redigera, markera som klar eller ta bort en
att-göra-uppgift.

Min lösning innehåller ett extra inmatningsfält för ett deadline-datum. 
Alla inmatningsfält valideras dessutom för korrekt värde i todoList-klassen. 
Samma gäller formulären för de enstaka att-göra-uppgiterna som visas i todo-listan.

Jag valde att använda MVC-strukturen för applikationen. 
App-klassen fungerar som en kontroller-klass. Denna klass hanterar 
kommunkationen mellan Todo-vyerna och TodoList-klassen så att de inte 
direkt kommunicerar med varandra för bättre separation mellan 
logiken och gränsnittet. Förstås är ariktekturen bara en förenkling 
av MVC-arkitekturen. Seprationen mellan logiken och gränsittet
hade nämligen kunnat förbättras via fler interfejs-specifikationer.

Ett exempel på detta är ViewI-intefejset. Om nya vyer läggs till,
behöver koden för vyerna inte omskrivas för att kunna uppdateras, utan
de nya vyerna implementerar interfejset ViewI och sin version av
init() funktionen.

De interfejs-sepcifikationer som jag använder i min app är dock
för det mesta för att underlätta arbetet med datatyperna. 
Tack vare dessa specifikationer, föreslår VS Code
rätt funktioner och fält för rätt typ av data.

### Detta hade jag gjort annorlunda

Eftersom uppgiften krävde att jag skulle hålla mig inom
de specificerade funktionssignaturerna, blev min lösning lite mer
komplicerad än vad den behövde vara. Om jag hade friheten att specificera
mina egna funktioner skulle jag inte ha använt indexvärdet för att
uppdatera att-göra-uppgifter utan tilldelat de unika identifaktorer
och uppdaterat dem baserat på dessa. Indexvärden måste nämligen ständigt
uppdateras och kan leda till många fel om detta missas. 

En annan sak jag hade gjort annorlunda är hanteringen av localStorage.
Jag önskar att signaturen för saveToLocalStorage tillät parametrar och
returvärden så att jag inte behövde skriva extra funktioner för att
se till att den temporära data är koherent med den som sparas i localSotrage.
Det kan nämligen hända att localStorage misslyckas men den temporära
listan uppdateras ändå, vilket bör inte ske. Användaren måste
nämligen veta om listan har uppdateras och sparats i webbläsaren eller inte.
Av den anledning lade jag till trySave() funktionen till min TodoList klass och
lät saveToLocalStorage() funktionen köra inuti try och catch blocket. 

### Länken till webbplatsen -> https://wesl2400-miun.github.io/tslab2/