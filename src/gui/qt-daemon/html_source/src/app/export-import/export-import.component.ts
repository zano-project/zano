<<<<<<< HEAD
<<<<<<< HEAD
import { Component, OnInit, NgZone } from '@angular/core';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> contact service
=======
import { Component, OnInit, NgZone } from '@angular/core';
>>>>>>> new contacts display  after open import file
import { Location } from '@angular/common';
import { BackendService } from '../_helpers/services/backend.service';
import { VariablesService } from '../_helpers/services/variables.service';
import { Contact } from '../_helpers/models/contact.model';
import { ModalService } from '../_helpers/services/modal.service';
import { Papa } from 'ngx-papaparse';
import { TranslateService } from '@ngx-translate/core';
<<<<<<< HEAD
<<<<<<< HEAD
import { Router } from '@angular/router';
=======
>>>>>>> contact service
=======
import { Router } from '@angular/router';
>>>>>>> new contacts display  after open import file

@Component({
  selector: 'app-export-import',
  templateUrl: './export-import.component.html',
  styleUrls: ['./export-import.component.scss']
})
export class ExportImportComponent implements OnInit {
  csvContent;

  constructor(
    private location: Location,
    private variablesService: VariablesService,
    private backend: BackendService,
    private modalService: ModalService,
    private papa: Papa,
<<<<<<< HEAD
<<<<<<< HEAD
    private translate: TranslateService,
    private router: Router,
    private ngZone: NgZone
=======
    private translate: TranslateService
>>>>>>> contact service
=======
    private translate: TranslateService,
    private router: Router,
    private ngZone: NgZone
>>>>>>> new contacts display  after open import file
  ) {}

  ngOnInit() {}

  import() {
    this.backend.openFileDialog(
      '',
      '*',
      this.variablesService.settings.default_path,
      (file_status, file_data) => {
        if (file_status) {
          this.variablesService.settings.default_path = file_data.path.substr(
            0,
            file_data.path.lastIndexOf('/')
          );
          if (this.isValid(file_data.path)) {
            this.backend.loadFile(file_data.path, (status, data) => {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> add type '.csv',validation empty contact list/file
              if (!status) {
                this.modalService.prepareModal(
                  'error',
                  'CONTACTS.ERROR_IMPORT_EMPTY'
                );
              } else {
<<<<<<< HEAD
=======
              if (status) {
>>>>>>> contact service
=======
>>>>>>> add type '.csv',validation empty contact list/file
                const options = {
                  header: true
                };
                const elements = this.papa.parse(data, options);
<<<<<<< HEAD
<<<<<<< HEAD
                const isArray = Array.isArray(elements.data);
                if (isArray && elements.data.length !== 0 && !elements.errors.length) {
=======

                if (elements.data && !elements.errors.length) {
>>>>>>> contact service
=======
                const isArray = Array.isArray(elements.data);
                if (isArray && elements.data.length !== 0 && !elements.errors.length) {
>>>>>>> fix data.foreach & rebuild html
                  if (!this.variablesService.contacts.length) {
                    elements.data.forEach(element => {
                      this.variablesService.contacts.push(element);
                    });
                  } else {
                    elements.data.forEach(element => {
                      const indexName = this.variablesService.contacts.findIndex(
                        contact => contact.name === element.name
                      );
                      const indexAddress = this.variablesService.contacts.findIndex(
                        contact => contact.address === element.address
                      );
                      if (indexAddress === -1 && indexName === -1) {
                        this.variablesService.contacts.push(element);
                      }
                      if (indexName !== -1 && indexAddress === -1) {
                        this.variablesService.contacts.push({
                          name: `${element.name} ${this.translate.instant(
                            'CONTACTS.COPY'
                          )}`,
                          address: element.address,
                          notes: element.notes
                        });
                      }
                    });
                  }
                  this.backend.getContactAlias();
<<<<<<< HEAD
<<<<<<< HEAD
                  this.ngZone.run(() => {
                    this.router.navigate(['/contacts']);
                  });
=======
                  this.modalService.prepareModal(
                    'success',
                    'CONTACTS.SUCCESS_IMPORT'
                  );
>>>>>>> contact service
=======
                  this.ngZone.run(() => {
                    this.router.navigate(['/contacts']);
                  });
>>>>>>> new contacts display  after open import file
                }
                if (elements.errors.length) {
                  this.modalService.prepareModal(
                    'error',
                    'CONTACTS.ERROR_IMPORT'
                  );
                  console.log(elements.errors);
                }
              }
            });
          } else {
            this.modalService.prepareModal('error', 'CONTACTS.ERROR_TYPE_FILE');
          }
        }
      }
    );
  }

  export() {
    const contacts: Array<Contact> = [];
    this.variablesService.contacts.forEach(contact => {
      delete contact.alias;
      contacts.push(contact);
    });

    this.backend.saveFileDialog(
      '',
      '*',
      this.variablesService.settings.default_path,
      (file_status, file_data) => {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> add type '.csv',validation empty contact list/file
        if (!this.variablesService.contacts.length && !(file_data.error_code === 'CANCELED')) {
          this.modalService.prepareModal('error', 'CONTACTS.ERROR_EMPTY_LIST');
        }
        const path = this.isValid(file_data.path) ? file_data.path : `${file_data.path}.csv`;
        if (file_status && this.isValid(path) && this.variablesService.contacts.length) {
          this.backend.storeFile(path, this.papa.unparse(contacts));
<<<<<<< HEAD
<<<<<<< HEAD
        }
        if (!(file_data.error_code === 'CANCELED') && !this.isValid(path)) {
          this.modalService.prepareModal('error', 'CONTACTS.ERROR_EXPORT');
=======
        if (file_status) {
          this.backend.storeFile(file_data.path, this.papa.unparse(contacts));
>>>>>>> contact service
=======
=======
>>>>>>> commit
        if (file_status && this.isValid(file_data.path)) {
          this.backend.storeFile(file_data.path, this.papa.unparse(contacts));
=======
>>>>>>> add type '.csv',validation empty contact list/file
          this.modalService.prepareModal(
            'success',
            'CONTACTS.SUCCESS_EXPORT'
          );
=======
>>>>>>> new contacts display  after open import file
        }
        if (!(file_data.error_code === 'CANCELED') && !this.isValid(path)) {
          this.modalService.prepareModal('error', 'CONTACTS.ERROR_EXPORT');
<<<<<<< HEAD
>>>>>>> fix export import
=======
=======
        if (file_status) {
          this.backend.storeFile(file_data.path, this.papa.unparse(contacts));
>>>>>>> 3ff1ce583e414436a973956284587d52e402f589
>>>>>>> commit
        }
      }
    );
  }

  isValid(file) {
    return file.endsWith('.csv');
  }

  back() {
    this.location.back();
  }
}
