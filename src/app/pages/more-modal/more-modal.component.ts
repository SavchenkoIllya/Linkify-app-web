import { CategoriesService } from './../../services/categories.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from './../../services/modal.service';

@Component({
  selector: 'app-more-modal',
  templateUrl: './more-modal.component.html',
  styleUrls: ['./more-modal.component.scss'],
})
export class MoreModalComponent implements OnInit {
  constructor(
    public CategoriesService: CategoriesService,
    public ModalService: ModalService
  ) {}

  modal: boolean = false;
  @Input() category: any;
  @Input() changeModal: boolean = false;
  @Output() modalChange = new EventEmitter<boolean>();

  open() {
    this.changeModal = !this.changeModal;
    this.modalChange.emit(this.changeModal);
  }

  ngOnInit(): void {}
}
