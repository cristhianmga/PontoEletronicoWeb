import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { MapsAPILoader, AgmMarker } from '@agm/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PadraoService } from 'src/app/service/padrao-service';

@Component({
  selector: 'app-localicazao',
  templateUrl: './localicazao.component.html',
  styleUrls: ['./localicazao.component.css']
})
export class LocalicazaoComponent implements OnInit {
	title: string = 'AGM project';
	latitude: number;
	longitude: number;
	zoom:number;
	address: string = null;
	private geoCoder;
	
	displayedColumns: string[] = ['endereco', 'latitude', 'longitude','Acoes'];
	dataSource:any[] = [];
 
	@ViewChild('search',{static:true})
	public searchElementRef: ElementRef;

	constructor(
		private mapsAPILoader: MapsAPILoader,
		private ngZone: NgZone,
		private _snackBar: MatSnackBar,
		private service:PadraoService) { }

	ngOnInit() {
		//load Places Autocomplete
		this.mapsAPILoader.load().then(() => {
			this.setCurrentLocation();
			this.geoCoder = new google.maps.Geocoder;
			let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
			autocomplete.addListener("place_changed", () => {
				this.ngZone.run(() => {
				//get the place result
				let place: google.maps.places.PlaceResult = autocomplete.getPlace();
		
				//verify result
				if (place.geometry === undefined || place.geometry === null) {
					return;
				}
		
				//set latitude, longitude and zoom
				this.latitude = place.geometry.location.lat();
				this.longitude = place.geometry.location.lng();
				this.address = place.formatted_address;
				this.zoom = 12;
				});
			});
		});

		this.service.ListarTodos('localizacao').subscribe(x => {
			this.dataSource = x;
		});
	}

	

	
	openSnackBar(message: string, botao: string) {
		this._snackBar.open(message, botao, {
		  duration: 10000,
		  horizontalPosition:'right',
		  verticalPosition:'top'
		});
	}

	private setCurrentLocation() {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				this.latitude = position.coords.latitude;
				this.longitude = position.coords.longitude;
				this.zoom = 15;
				this.getAddress(this.latitude,this.longitude);
			});
		}
	}

	mapaClick($event){
		this.latitude = $event.coords.lat;
		this.longitude = $event.coords.lng;
		this.getAddress(this.latitude, this.longitude);
	}

	getAddress(latitude, longitude) {
		this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
		if (status === 'OK') {
			if (results[0]) {
				this.address = results[0].formatted_address;
			} else {
				window.alert('No results found');
			}
		} else {
			window.alert('Geocoder failed due to: ' + status);
		}
	
		});
	}

	adicionarLocalizacao(){
		if(this.address && this.latitude && this.longitude){
			if(!this.validateListExists(this.dataSource,{latitude:this.latitude,longitude:this.longitude})){
				this.dataSource.push({id:0,endereco:this.address,latitude:this.latitude,longitude:this.longitude});
				this.dataSource = [...this.dataSource]
			}
		}
	}

	getItemBy(arr: any, filter: any) {
        if (arr == null)
            return "";
        let ret = arr.find(item => {
            let select = true;
            Object.keys(filter).forEach(fkey => {
                if (select && item[fkey] != filter[fkey])
                    select = false;
            });
            return select;
        });
        return ret ? ret : "";
	}
	

    validateListExists(list: any, obj: any) {
        if (this.getItemBy(list, obj) != "") {
            return true;
        } else {
            return false;
        }
	}

	excluirItem(index){
		this.dataSource.splice(index, 1);
		this.dataSource = [...this.dataSource];
	}
	
	salvar(){
		if(this.dataSource.length > 0){
			this.service.Adicionar('localizacao',this.dataSource).subscribe(data => {
				this.openSnackBar('Endereços salvos.','fechar');
			})
		}else{
			this.openSnackBar('É necessário adicionar uma localização para salvar.','fechar');
		}
	}
}
