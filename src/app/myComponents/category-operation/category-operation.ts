import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryRequestModel } from './CategoryViewModel/CategoryRequestModel';
import { CategoryResponseModel } from './CategoryViewModel/CategoryResponseModel';
import { UpdateCategoryRequestModel } from './CategoryViewModel/UpdateCategoryRequestModel';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms'; //NgModel: two-way data binding için gerekli (can't bind to 'ngModel' hatası çözümü)

@Component({
  selector: 'app-category-operation',
  imports: [RouterLink, FormsModule],
  templateUrl: './category-operation.html',
  styleUrl: './category-operation.css',
})
export class CategoryOperation {
  private http = inject(HttpClient);

  protected categories = signal<CategoryResponseModel[]>([]);

  async ngOnInit(): Promise<void> {
    this.categories.set(await this.getCategories());
  }

  //#region CategoryList
  async getCategories(): Promise<CategoryResponseModel[]> {
    try {
      const values: CategoryResponseModel[] = await lastValueFrom(
        this.http.get<CategoryResponseModel[]>(
          'http://localhost:5231/api/Categories'
        )
      );
      return values;
    } catch (error) {
      console.log(error)
      throw error;
    }

  }
  //#endregion

  //#region CategoryCreate
  protected createCategoryForm = signal<CategoryRequestModel>({
    categoryName: '',
    description: ''
  });

  onCreateChange(field: string, event: Event) {
    const value = (event.target as HTMLInputElement).value;

    //createCategoryForm signalinin update edilmesi
    this.createCategoryForm.update(form => {
      //form bir object. onu kopyalayıp sadece ilgili field'ı güncelliyoruz
      return {
        ...form,
        [field]: value
      };
    });
  }

  async addCategory(event: Event): Promise<void> {
    event.preventDefault(); //sayfanın yenilenmesini engeller

    // const body = this.createCategoryForm();
    const body = this.createCategoryPatchForm();

    //ngModel için
    const body2: CategoryRequestModel = this.createCategoryModel;
    

    try {
      const message = await lastValueFrom(
        this.http.post('http://localhost:5231/api/Categories', body2, { responseType: 'text' })
      );

      console.log("Api mesajı:", message);
      this.categories.set(await this.getCategories());

      //createRequestModel'i resetleme
      this.createCategoryForm.set({
        categoryName: '',
        description: ''
      });

      this.createCategoryModel.categoryName = '';
      this.createCategoryModel.description = '';

    } catch (error) {
      console.log(error);
    }
  }
  //#endregion

  //#region Patch ile CreateForm Şekillendirme

  protected createCategoryPatchForm = signal<CategoryRequestModel>({
    categoryName: '',
    description: ''
  });

  patchCreateForm(patch: Partial<CategoryRequestModel>) {
    this.createCategoryPatchForm.update((form) => ({
      ...form,
      ...patch
    }));
  }
  //#endregion

  //#region ngModel
  protected createCategoryModel: CategoryRequestModel = {
    categoryName: '',
    description: ''
  };
  //#endregion
}








