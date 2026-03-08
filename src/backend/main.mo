import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Migration "migration";

(with migration = Migration.run)
actor {
  type Signup = {
    name : Text;
    email : Text;
    timestamp : Int;
  };

  module Signup {
    public func compare(signup1 : Signup, signup2 : Signup) : Order.Order {
      switch (Text.compare(signup1.name, signup2.name)) {
        case (#equal) { Text.compare(signup1.email, signup2.email) };
        case (order) { order };
      };
    };

    public func compareByEmail(signup1 : Signup, signup2 : Signup) : Order.Order {
      Text.compare(signup1.email, signup2.email);
    };
  };

  stable var signups = Array.empty<Signup>();

  public shared ({ caller }) func submitSignup(name : Text, email : Text) : async Text {
    if (name.isEmpty()) {
      Runtime.trap("Name cannot be empty");
    };

    if (email.isEmpty() or not email.contains(#char '@')) {
      Runtime.trap("Invalid email address");
    };

    if (signups.any(func(s) { s.email == email })) {
      Runtime.trap("Email already signed up");
    };

    let newSignup : Signup = {
      name;
      email;
      timestamp = Time.now();
    };

    signups := signups.concat([newSignup]);
    "You're on the list! We'll be in touch.";
  };

  public query ({ caller }) func isEmailRegistered(email : Text) : async Bool {
    signups.any(func(s) { s.email == email });
  };

  public query ({ caller }) func getSignups() : async [Signup] {
    signups;
  };

  public query ({ caller }) func getAllSignupsSorted() : async [Signup] {
    signups.sort();
  };

  public query ({ caller }) func getAllSignupsSortedByEmail() : async [Signup] {
    signups.sort(Signup.compareByEmail);
  };
};
