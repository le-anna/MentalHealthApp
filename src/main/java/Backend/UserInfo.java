package Backend;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity()
@Table(name = "dbo.UserInfo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class UserInfo {
	
	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int UserID;
	
	private String name;
	
	
	public UserInfo() {
		
	}
	
	public UserInfo(String name) {
		this.name = name;
	}
	
	public int getUserID() {
		return UserID;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}


}
