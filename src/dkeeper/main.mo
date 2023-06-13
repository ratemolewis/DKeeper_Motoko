import List "mo:base/List";
import Debug "mo:base/Debug";
//create new canister
actor DKeeper {
    //create new data type

   public  type Note = {
        title: Text;
        content: Text;
    };

    // create new variable, notes with data dtypr List
    // list will contain Note type
    var notes: List.List<Note> = List.nil<Note>();

    public func newNote( titleText: Text, contentText: Text){
        // create new note
        let newNote: Note = {
            title = titleText;
            content = contentText;
        };
   //add the newNote to the front of the notes lists
       notes := List.push(newNote, notes);
       Debug.print(debug_show(notes));
    };
    //read the list notes, to pass to the frontend
    public query func readNotes(): async [Note]{
        // convert the list to array objects
      return List.toArray(notes);// return an array of note objects
    };
};