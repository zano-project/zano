import {Component, NgZone, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BackendService} from '../_helpers/services/backend.service';
import {VariablesService} from '../_helpers/services/variables.service';
import {ModalService} from '../_helpers/services/modal.service';
import {Wallet} from '../_helpers/models/wallet.model';

import icons from '../../assets/icons/icons.json';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  queryRouting;

  regForm = new FormGroup({
    password: new FormControl('',
    Validators.pattern(this.variablesService.pattern)),
    confirmation: new FormControl('')
  }, [function (g: FormGroup) {
    return g.get('password').value === g.get('confirmation').value ? null : {'mismatch': true};
  }
]);

  authForm = new FormGroup({
    password: new FormControl('')
  });

  type = 'reg';
<<<<<<< HEAD

  logo = icons.logo;
=======
>>>>>>> contact service

  logo = icons.logo;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private backend: BackendService,
    public variablesService: VariablesService,
    private modalService: ModalService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.queryRouting = this.route.queryParams.subscribe(params => {
      if (params.type) {
        this.type = params.type;
      }
    });
  }

  onSubmitCreatePass(): void {
    if (this.regForm.valid) {
      this.variablesService.appPass = this.regForm.get('password').value;  // the pass what was written in input of login form by user

      this.backend.setMasterPassword({pass: this.variablesService.appPass}, (status, data) => {
        if (status) {
          this.backend.storeSecureAppData({pass: this.variablesService.appPass});
          this.variablesService.appLogin = true;
          this.variablesService.dataIsLoaded = true;
          this.variablesService.startCountdown();
          this.ngZone.run(() => {
            this.router.navigate(['/']);
          });
        } else {
          console.log(data['error_code']);
        }
      });
    }
  }

  onSkipCreatePass(): void {
    this.variablesService.appPass = '';
    this.ngZone.run(() => {
      this.variablesService.appLogin = true;
      this.router.navigate(['/']);
    });
  }

   dropSecureAppData(): void {
     this.backend.dropSecureAppData(() => {
       this.onSkipCreatePass();
     });
     this.variablesService.wallets = [];
     this.variablesService.contacts = [];
   }

  onSubmitAuthPass(): void {
    if (this.authForm.valid) {
      this.variablesService.appPass = this.authForm.get('password').value;

      if (this.variablesService.dataIsLoaded) {
         this.backend.checkMasterPassword({pass: this.variablesService.appPass}, (status, data) => {
           if (status) {
              this.variablesService.appLogin = true;
              this.variablesService.startCountdown();
              this.ngZone.run(() => {
                this.router.navigate(['/']);
              });
           }
         });
      } else {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        this.getData(this.variablesService.appPass);
=======
        this.getWalletData(this.variablesService.appPass);
>>>>>>> contact service
=======
        this.getData(this.variablesService.appPass);
>>>>>>> fix master pass (immigration 41 > 43)
=======
        this.getData(this.variablesService.appPass);
=======
        this.getWalletData(this.variablesService.appPass);
>>>>>>> 3ff1ce583e414436a973956284587d52e402f589
>>>>>>> commit
      }
    }
  }

  getData(appPass) {
    this.backend.getSecureAppData({pass: appPass}, (status, data) => {
      if (!data.error_code) {
        this.variablesService.appLogin = true;
        this.variablesService.dataIsLoaded = true;
        this.variablesService.startCountdown();
        this.variablesService.appPass = appPass;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        const isEmptyObject = Object.keys(data).length === 0 && data.constructor === Object;

=======
=======
>>>>>>> commit
        if (Object.keys(data['contacts']).length !== 0) {
          data['contacts'].map(contact => {
            this.variablesService.contacts.push(contact);
          });
        }
<<<<<<< HEAD
>>>>>>> contact service
=======
>>>>>>> fix master pass (immigration 41 > 43)
=======
>>>>>>> commit
=======
        const isEmptyObject = Object.keys(data).length === 0 && data.constructor === Object;

>>>>>>> fix data.foreach & rebuild html
        if (this.variablesService.wallets.length) {
          this.ngZone.run(() => {
            this.router.navigate(['/wallet/' + this.variablesService.wallets[0].wallet_id]);
          });
          return;
        }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> fix master pass (immigration 41 > 43)
=======
>>>>>>> commit
        if (data.hasOwnProperty('contacts')) {
          if (Object.keys(data['contacts']).length !== 0) {
            data['contacts'].map(contact => {
              this.variablesService.contacts.push(contact);
            });
          }
        }
        if (data.hasOwnProperty('wallets')) {
          if (Object.keys(data['wallets']).length !== 0) {
            this.getWalletData(data['wallets']);
          } else {
            this.ngZone.run(() => {
              this.router.navigate(['/']);
            });
          }
        }
        if (!data.hasOwnProperty('wallets') && !data.hasOwnProperty('contacts')) {
<<<<<<< HEAD
<<<<<<< HEAD
          if (data.length !== 0  && !isEmptyObject) {
=======
          if (data.length !== 0) {
>>>>>>> fix master pass (immigration 41 > 43)
=======
          if (data.length !== 0  && !isEmptyObject) {
>>>>>>> fix data.foreach & rebuild html
            this.getWalletData(data);
          } else {
            this.ngZone.run(() => {
              this.router.navigate(['/']);
            });
          }
        }
      }
    });
  }

  getWalletData(walletData) {
    let openWallets = 0;
    let runWallets = 0;
    walletData.forEach((wallet, wallet_index) => {
      this.backend.openWallet(wallet.path, wallet.pass, true, (open_status, open_data, open_error) => {
        if (open_status || open_error === 'FILE_RESTORED') {
          openWallets++;
          this.ngZone.run(() => {
            const new_wallet = new Wallet(
              open_data.wallet_id,
              wallet.name,
              wallet.pass,
              open_data['wi'].path,
              open_data['wi'].address,
              open_data['wi'].balance,
              open_data['wi'].unlocked_balance,
              open_data['wi'].mined_total,
              open_data['wi'].tracking_hey
            );
            new_wallet.alias = this.backend.getWalletAlias(new_wallet.address);
            if (wallet.staking) {
              new_wallet.staking = true;
              this.backend.startPosMining(new_wallet.wallet_id);
            } else {
              new_wallet.staking = false;
            }
            if (open_data.recent_history && open_data.recent_history.history) {
              new_wallet.prepareHistory(open_data.recent_history.history);
            }
            this.backend.getContracts(open_data.wallet_id, (contracts_status, contracts_data) => {
              if (contracts_status && contracts_data.hasOwnProperty('contracts')) {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> commit
=======
        if (Object.keys(data['wallets']).length !== 0) {
          let openWallets = 0;
          let runWallets = 0;
          data['wallets'].forEach((wallet, wallet_index) => {
            this.backend.openWallet(wallet.path, wallet.pass, true, (open_status, open_data, open_error) => {
              if (open_status || open_error === 'FILE_RESTORED') {
                openWallets++;
<<<<<<< HEAD
>>>>>>> contact service
=======
>>>>>>> fix master pass (immigration 41 > 43)
=======
>>>>>>> 3ff1ce583e414436a973956284587d52e402f589
>>>>>>> commit
                this.ngZone.run(() => {
                  new_wallet.prepareContractsAfterOpen(contracts_data.contracts, this.variablesService.exp_med_ts, this.variablesService.height_app, this.variablesService.settings.viewedContracts, this.variablesService.settings.notViewedContracts);
                });
              }
            });
            this.variablesService.wallets.push(new_wallet);
            if (this.variablesService.wallets.length === 1) {
              this.router.navigate(['/wallet/' + this.variablesService.wallets[0].wallet_id]);
            }
          });
          this.backend.runWallet(open_data.wallet_id, (run_status) => {
            if (run_status) {
              runWallets++;
            } else {
              if (wallet_index === walletData.length - 1 && runWallets === 0) {
                this.ngZone.run(() => {
                  this.router.navigate(['/']);
                });
              }
            }
          });
        } else {
          if (wallet_index === walletData.length - 1 && openWallets === 0) {
            this.ngZone.run(() => {
              this.router.navigate(['/']);
            });
          }
        }
      });
    });
  }


  ngOnDestroy() {
    this.queryRouting.unsubscribe();
  }

}
