import { Injectable } from '@angular/core';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { ObservableBlockPanel } from '../util/observable-util';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';

@Injectable({
    providedIn: 'root',
})
export class SpinnerComponent {
    private spinnerRef: OverlayRef = this.cdkSpinnerCreate();
        constructor(private overlay: Overlay,private Obs:ObservableBlockPanel) {
            this.Obs.getBlockedPanel().subscribe(x =>{
                if(x){
                    this.showSpinner();
                }else{
                    this.stopSpinner();
                }
            });
        }

    private cdkSpinnerCreate() {
        return this.overlay.create({
            hasBackdrop: true,
            backdropClass: 'dark-backdrop',
            positionStrategy: this.overlay.position()
            .global()
            .centerHorizontally()
            .centerVertically()
        })
     }
     showSpinner() {
        this.spinnerRef.attach(new ComponentPortal(MatSpinner))
     }
     stopSpinner() {
        this.spinnerRef.detach();
     }
}