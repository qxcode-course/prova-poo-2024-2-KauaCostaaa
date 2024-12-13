function input(): string { let X: any = input; X.L = X.L || require("fs").readFileSync(0).toString().split(/\r?\n/); return X.L.shift(); } // _TEST_ONLY_
//function input(): string { let X: any = input; X.P = X.P || require("readline-sync"); return X.P.question() } // _FREE_ONLY_
function write(text: any, endl="\n") { process.stdout.write("" + text + endl); }
export {};

class Carregador{
    private potencia: number;
    constructor(potencia: number){
        this.potencia = potencia;
    }
    getPotencia(): number{
        return this.potencia
    }
}

class Bateria{
    private capacidade: number;
    private carga: number;
    constructor(capacidade: number){
        this.capacidade = capacidade;
        this.carga = 0;
    }
    carregada(): boolean{
        return this.carga > 0
    }

    carregar(carregador: Carregador): void{
        this.carga += carregador.getPotencia()
        if(this.carga > this.capacidade) {
            this.carga = this.capacidade
        }
    }
    descarregar(tempo: number): void{
        this.carga -= tempo
        if (this.carga <= 0) {
            this.carga = 0
        }
    }

}

class Notebook{
    private carregador: Carregador | null
    private bateria: Bateria | null
    private ligado: boolean
    constructor(){
        this.carregador = null
        this.bateria = null
        this.ligado = false
    }

    turnOn(): boolean {
        if (this.ligado) {
            console.log("Ligado")
            return false
        }
        if (this.carregador != null){
            this.ligado = true;
            return true
        }
        if (this.bateria != null && this.bateria.carregada()){
            this.ligado = true
            return true
        }
        return false
    }

    usar(tempo: number) {
        if(!this.ligado){
            console.log("Desligado")
            return;
        }
    }

}

class Adapter {
    private notebook: Notebook = new Notebook();
    show(): void {
        console.log(this.notebook.toString());
    }

    turnOn(): void {
        this.notebook.turnOn();
    }

    turnOff(): void {
        // this.notebook.turnOff();
    }

    setCharger(power: number): void {
        //TODO: Implementar
    }

    removeCharger(): void {
        // let charger = this.notebook.removeCharger();
        // if (charger) {
        //     console.log(`Removido ${charger}`);
        // } else {
        //     console.log("fail: Sem carregador");
        // }
    }

    setBattery(capacity: number): void {
        //TODO Implementar
    }

    removeBattery(): void {
        // let battery = this.notebook.removeBattery();
        // if (battery) {
        //     console.log(`Removido ${battery}`);
        // } else {
        //     console.log("fail: Sem bateria");
        // }
    }

    usar(tempo: number): void {
        this.notebook.usar(tempo);
    }
}

// Função principal
function main() {
    const adapter = new Adapter();
    while (true) {
        let line = input();
        let args = line.split(" ");
        write("$" + line);

        if      (args[0] === "end"        ) { break;                           }
        else if (args[0] === "show"       ) { adapter.show();                  }
        else if (args[0] === "turn_on"    ) { adapter.turnOn();                }
        else if (args[0] === "turn_off"   ) { adapter.turnOff();               }
        else if (args[0] === "use"        ) { adapter.usar(+args[1]);           }
        else if (args[0] === "set_charger") { adapter.setCharger(+args[1]);    }
        else if (args[0] === "rm_charger" ) { adapter.removeCharger();         }
        else if (args[0] === "set_battery") { adapter.setBattery(+args[1]);    }
        else if (args[0] === "rm_battery" ) { adapter.removeBattery();         }
        else                                { write("fail: comando inválido"); }

    }
}

main();
