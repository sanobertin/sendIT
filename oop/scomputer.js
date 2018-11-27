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


let macbook= new Computer('MacBook pro', 'amd64', 520, 4, 'MacOS');
macbook.getName();
macbook.getArchitecture();
macbook.getDisk();
macbook.getRAM();
macbook.getOS();

class SuperComputer extends Computer {
    constructor(name, architecture, disk, ram, os){
        super(disk, ram);
        this.name= name;
        this.architecture= architecture;
        this.disk= disk;
        this.ram= ram;
        this.os= os;

    }
    getName(){
        console.log(`${this.name}    [EDITED METHOD]`)
    }
    getArchitecture(){
        console.log(`${this.architecture}    [EDITED METHOD]`)
    }
    getDisk(){
        console.log(`${this.disk} GB    [EDITED METHOD]`)
    }
    getRAM(){
        console.log(`${this.ram}  GB    [EDITED METHOD]`)
    }
    getOS(){
        console.log(`${this.os}    [EDITED METHOD]`)
    }

}
console.log('\n\n\n\n')
let ibm= new SuperComputer('IBM', 'x64', 1200000,64 , 'Windows');
ibm.getName();
ibm.getArchitecture();
ibm.getDisk();
ibm.getRAM();
ibm.getOS();
