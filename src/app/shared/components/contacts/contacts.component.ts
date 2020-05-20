import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTabChangeEvent } from '@angular/material';
import { ContactService } from '../../services/contact.service';
import { Contact } from 'src/app/shared/services/contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

export class ContactsComponent implements OnInit {

  contacts: Contact [] = [];
  cadastrar: boolean;
  selectedIndex: number = 0;
  
  myModel= '';
  value='';
  datemask = ['(', /\d/, /\d/, ')', ' ',  /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(private contactService: ContactService,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.list();
    this.cadastrar = true;
  }

  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedIndex = tabChangeEvent.index;

    if(this.selectedIndex == 0) {
      this.cadastrar = true;
    }
  }

  public nextStep() {
    this.selectedIndex += 1;
  }

  list(){

    this.cadastrar = false;
    this.contactService
      .listContacts()
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts.items;
    });
  }

  add(contact: Contact) {
    this.contactService 
      .addContact(contact)
      .subscribe(() => {
        this.list();
        this.cadastrar = false;
      });
  }

  delete(contact: Contact) {
    this.contactService 
          .deleteContact(contact.id)
          .subscribe(() => {
            this.list();
          });
  }

}
