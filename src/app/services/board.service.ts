import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Column } from './models/column.model';

@Injectable({
    providedIn: 'root',
})
export class BoardService {

    private initBoard = [
        {
            id: 1,
            title: 'Para Fazer',
            color: '#009886',
            list: [
                {
                    id: 1,
                    text: 'Exemplo de titulo',
                    like: 1,
                    comments:[
                        {
                            id: 1,
                            text: 'Comentario'
                        }
                    ]

                },
            ]
        },
    ]
    private board: Column[] = this.initBoard
    private board$ = new BehaviorSubject<any[]>(this.initBoard)

    getBoard$() {
        return this.board$.asObservable()
    }

    changeColumnColor(color: string, columnId: number){
        this.board = this.board.map((column: any) =>{
            if(column.id === columnId){
            column.color = color;
            }
            return column;
        });
        this.board$.next([...this.board]);
    }

    addColumn(title: string){
        const newColumn: any = {
            id: Date.now(),
            title: title,
            color: '#009886',
            list: [],
        };

        this.board = [...this.board, newColumn];
        this.board$.next([...this.board]);
    }

    addCard(text: string,columnId:number){
        const newCard: any ={
            id:Date.now(),
            text,
            like: 0,
            comments: [],
        };
        this.board = this.board.map((column: any) =>{
            if(column.id === columnId){
                column.list = [newCard, ...column.list];
            }
            return column;
        });
        this.board$.next([...this.board]);
    }
    deleteColumn(columnId:any){
        this.board = this.board.filter((column:any)=> column.id !== columnId)
        this.board$.next([...this.board]);
    }
    deleteCard(cardId: number, columnId: number){
        this.board = this.board.map((column:any) =>{
            if(column.id === columnId){
                column.list = column.list.filter((card: any) => card.id !== cardId);
            }
            return column;
        });
        this.board$.next([...this.board]);
    }
    changeLike(cardId:number,columnId:number,increase: boolean){
        this.board = this.board.map((column) =>{
            if(column.id === columnId){
                const list = column.list.map((card:any) =>{
                    if(card.id ===cardId){
                        if (increase){
                            card.like++;
                        }else{
                            if(card.like>0){
                                card.like--;
                            }
                        }
                    }
                    return card;
                });
                column.list = list;
                return column;
            }else{
                    return column;
                }
            });
        this.board$.next([...this.board]);
    }
    addComment(columnId: number, cardId: number, text: string) {
        this.board = this.board.map((column: any) => {
            if(column.id === columnId){
                const list = column.list.map((card:any)=>{
                    if (card.id === cardId) {
                        const newComment = {
                            id: Date.now(),
                            text,
                        };
                        card.comments = [newComment, ...card.comments];
                    }
                    return card;
                });
                column.list = list;
            }
            return column;
        });
        this.board$.next([...this.board]);
      }

    deleteComment(columnId:any,itemId:any,commentId:any){
        this.board = this.board.map((column)=>{
            if(column.id === columnId){
                const list = column.list.map( (item:any) => {
                    if(item.id === itemId){
                        item.comments = item.comments.filter((comment:any)=>{
                            return comment.id !== commentId
                        })
                    }
                    return item;
                })
                column.list = list;
            }
            return column;
        })
        this.board$.next([...this.board])
    }
}