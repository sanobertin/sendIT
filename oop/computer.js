class Computer {
    constructor(name, architecture, disk, ram, os){
        this.name= name;
        this.architecture= architecture;
        this.disk= disk;
        this.ram= ram;
        this.os= os;
    }
    getName(){
        console.log(`${this.name}`)
    }
    getArchitecture(){
        console.log(`${this.architecture}`)
    }
    getDisk(){
        console.log(`${this.disk}  GB`)
    }
    getRAM(){
        console.log(`${this.ram}  GB`)
    }
    getOS(){
        console.log(`${this.os} `)
    }


}


export default Computer;