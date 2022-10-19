import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LinkService } from './../../services/link.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-link',
  templateUrl: './add-link.component.html',
  styleUrls: ['./add-link.component.scss'],
})
export class AddLinkComponent implements OnInit {
  constructor(public LinkService: LinkService) {}
  @Input() changeModal = false;
  @Input() categoryData: any;
  @Output() modalChange = new EventEmitter<boolean>();
  openModal = false;
  link = new FormControl('');
  linkForm = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
  });

  closeModal() {
    this.changeModal = !this.changeModal;
    this.modalChange.emit(this.changeModal);
  }

  ngOnInit(): void {
    if (this.openModal) {
      document.body.style.overflow = 'hidden';
    }
  }
}
