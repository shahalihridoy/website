import { Directive, EventEmitter, Output, ElementRef, HostListener, Renderer2, ViewChild, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from "./auth.service";
import { createElement } from '@angular/core/src/view/element';
import { HttpRequest } from 'selenium-webdriver/http';

@Directive({
  selector: '[comment]'
})
export class CommentDirective {

  view: boolean = true;
  commentList: Observable<any> = null;

  constructor(private auth: AuthService, private db: AngularFireDatabase, public data: DataService, private el: ElementRef, private ren: Renderer2) {
  }

  @HostListener('click') getClick() {

    var head = this.el.nativeElement.offsetParent.offsetParent;
    var uid = head.id;

    if(this.view){
      this.view = !this.view;
    }
    else {
      this.view = !this.view;
      this.ren.removeChild(head,head.lastChild);
      return;
    }

    // grab data from firebase
    this.commentList = this.db.list('comment/' + uid).snapshotChanges().pipe(map(changes => {
      if (changes.length != 0)
        return changes.map(c => ({
          user: this.db.object("user/" + c.payload.val()['uid']).valueChanges(),
          ...c.payload.val()
        }));
    }));


    this.commentList.subscribe(e => {

      var comment = this.ren.createElement('div');
      this.ren.addClass(comment, 'comment');
  
      var hr = this.ren.createElement('hr');
      this.ren.appendChild(comment, hr);
      
      // first remoe previously loaded files

      if(head.querySelector('.comment')){
        this.ren.removeChild(head,head.lastChild);
      }

      this.ren.appendChild(head, comment);

      var i = 1;
      if (e != undefined)
        e.forEach(element => {
          element.user.subscribe(x => {

            // calling functiont to create element
            this.ceateCustomElement(x.photoUrl, x.name, 'user/' + element.uid, element.comment, comment);

            if (i === e.length) {

              // add all the element to parent
              var textarea = this.ren.createElement('textarea');
              this.ren.setAttribute(textarea, 'placeholder', 'write something to comment...');
              this.ren.appendChild(comment, textarea);

              var button = this.ren.createElement('button');
              this.ren.setProperty(button, 'innerHTML', 'Comment');
              this.ren.addClass(button, 'default-button');
              this.ren.appendChild(comment, button);

              // listen button click to add comment
              this.ren.listen(button, 'click', e => {
                var tag = textarea.value;
                this.ren.removeClass(textarea, 'danger');

                if (!this.auth.authenticated) {
                  alert("Please login to comment");
                  return;
                }
                if (!tag) {
                  this.ren.addClass(textarea, 'danger');
                }
                else {
                  this.db.list('comment/' + uid).push({
                    'uid': this.auth.currentUserId,
                    'comment': tag
                  }); // pushing object
                }
              });
    
            }

            i++;

          });

        });


      else {

        // add all the element to parent
        var textarea = this.ren.createElement('textarea');
        this.ren.setAttribute(textarea, 'placeholder', 'write something to comment...');
        this.ren.appendChild(comment, textarea);

        var button = this.ren.createElement('button');
        this.ren.setProperty(button, 'innerHTML', 'Comment');
        this.ren.addClass(button, 'default-button');
        this.ren.appendChild(comment, button);
        // listen button click to add comment
        this.ren.listen(button, 'click', e => {
          var tag = textarea.value;
          this.ren.removeClass(textarea, 'danger');

          if (!this.auth.authenticated) {
            alert("Please login to comment");
            return;
          }
          if (!tag) {
            this.ren.addClass(textarea, 'danger');
          }
          else {
            this.db.list('comment/' + uid).push({
              'uid': this.auth.currentUserId,
              'comment': tag
            }); // pushing object
          }
        });
        this.ren.appendChild(head, comment);
      }
    });

  }

  ceateCustomElement(img, name, ulink, com, parent) {

    var div = this.ren.createElement('div');

    var image = this.ren.createElement('img');
    this.ren.setAttribute(image, 'src', img);
    this.ren.addClass(image, 'comment-image');

    var a = this.ren.createElement('a');
    this.ren.setAttribute(a, 'href', ulink);
    this.ren.setProperty(a, 'innerHTML', name);

    var p = this.ren.createElement('p');
    this.ren.appendChild(p, a);
    this.ren.appendChild(p, this.ren.createText(" "+com));

    this.ren.appendChild(div, image);
    this.ren.appendChild(div, p)

    this.ren.appendChild(parent, div);
  }


}
