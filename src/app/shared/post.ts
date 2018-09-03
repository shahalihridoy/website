export class Post {
	name: string = null;
	course: string = null;
	file: string = null;
	photoUrl: string = null;
	semester: string = null;
	date: string = null;
	tag: string = null;
	file_name: string = null;
	file_size: string = null;
	post_key: string = null;
	// constructor(ass:number){}
	constructor(name,photoUrl,course,semester,tag,date,file,file_name,file_size,post_key){
		this.name = name;
		this.photoUrl = photoUrl;
		this.course = course;
		this.semester = semester;
		this.tag = tag;
		this.date = date;
		this.file = file;
		this.file_name = file_name;
		this.file_size = file_size;
		this.post_key = post_key;
	}

}
