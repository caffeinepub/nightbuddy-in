module {
  type Signup = {
    name : Text;
    email : Text;
    timestamp : Int;
  };

  type OldActor = {
    signups : [Signup];
  };

  type NewActor = {
    signups : [Signup];
  };

  public func run(old : OldActor) : NewActor {
    { signups = old.signups };
  };
};
