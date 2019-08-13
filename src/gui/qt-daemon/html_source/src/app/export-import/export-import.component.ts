import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BackendService } from '../_helpers/services/backend.service';
import { VariablesService } from '../_helpers/services/variables.service';
import { Contact } from '../_helpers/models/contact.model';
import { ModalService } from '../_helpers/services/modal.service';
import { Papa } from 'ngx-papaparse';
import { TranslateService } from '@ngx-translate/core';

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
    private translate: TranslateService
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
              if (status) {
                const options = {
                  header: true
                };
                const elements = this.papa.parse(data, options);

                if (elements.data && !elements.errors.length) {
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
                  this.modalService.prepareModal(
                    'success',
                    'CONTACTS.SUCCESS_IMPORT'
                  );
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
        if (file_status) {
          this.backend.storeFile(file_data.path, this.papa.unparse(contacts));
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
