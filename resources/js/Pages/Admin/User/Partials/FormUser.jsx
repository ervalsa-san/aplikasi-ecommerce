import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function FormUser({data, submitHandler, handleChange, submit}) {

    return (
      <div className="mt-4">
          <form onSubmit={submitHandler} className="bg-white px-4 py-4 rounded-lg max-w-7xl">
              <div className="flex w-full gap-4">
                  <div className="w-full pr-4 border-r-2">
                      <div className="mb-3 flex gap-4">
                          <div className="w-full">
                              <InputLabel value="Name"/>
                              <TextInput className="mt-2 w-full rounded-lg" placeholder="Name" type="text" name="name" value={data.name} onChange={handleChange}/>
                          </div>
                          <div className="w-full">
                              <InputLabel value="Email"/>
                              <TextInput className="mt-2 w-full rounded-lg" placeholder="Email" type="text" name="email" value={data.email} onChange={handleChange}/>
                          </div>
                      </div>
                      <div className="mb-3">
                          <InputLabel value="Phone Number"/>
                          <TextInput className="mt-2 w-full rounded-lg" placeholder="Phone Number" type="text" name="phone_number" value={data.phone_number} onChange={handleChange}/>
                      </div>
                      <div className="mb-3">
                          <InputLabel value="Address"/>
                          <textarea className="resize-none mt-2 w-full h-32 rounded-lg" placeholder="Address" type="text" name="address" value={data.address} onChange={handleChange}/>
                      </div>
                      <div className="mb-3">
                          <InputLabel value="Roles"/>
                          <select className="mt-2 w-full rounded-lg" name="role" value={data.role} onChange={handleChange}>
                              <option>Choose a role</option>
                              <option value="Admin">Admin</option>
                              <option value="Customer">Customer</option>
                              <option value="Courier">Courier</option>
                          </select>
                      </div>
                  </div>
                  <div className="w-full">
                      <div className="mb-3">
                          <InputLabel value="Store Name"/>
                          <TextInput className="mt-2 w-full rounded-lg" placeholder="Store Name" type="text" name="store_name" value={data.store_name} onChange={handleChange}/>
                      </div>
                      <div className="mb-3">
                          <InputLabel value="Wallet"/>
                          <TextInput className="mt-2 w-full rounded-lg" placeholder="Wallet" type="text" name="wallet" value={data.wallet} onChange={handleChange}/>
                      </div>
                      <div className="mb-3">
                          <InputLabel value="Password"/>
                          <TextInput className="mt-2 w-full rounded-lg" placeholder="Password" type="password" name="password" value={data.password} onChange={handleChange}/>
                      </div>
                      <PrimaryButton className="mt-2">{submit}</PrimaryButton>
                  </div>
              </div>
          </form>
      </div>
    );
}
