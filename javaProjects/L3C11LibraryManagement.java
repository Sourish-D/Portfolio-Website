package jdbc;
import java.time.LocalDateTime;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.*;
import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.sql.*;
import java.util.ArrayList;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

//A Java GUI application that manages a library's book records, users, and transactions.
//Key Features:
//User Roles: Admin & Members
//Book Inventory: Add, remove, update, and search books
//Borrow & Return System: Track issued books with due dates
//Fine Calculation: Automatic fine for overdue books
//Login System: Secure login using username & password

public class L3C11LibraryManagement {

	public static void main(String[] args) {
		new Library();
	}

}
class Library {
	//Font
	Font big;
	Font text;
	Font medium;
	//Login
	
	JFrame login;
	
	//Main Admin Screen
	JFrame adminMain;
	//Add (Add, Remove, Update, Search) buttons
	JFrame add;
	//Add (Issued books) (print all of them)
	JFrame borrows;
	
	//Main Member Screen
	JFrame memberMain;
	//Add (Search)  Button
	JFrame search;
	JFrame input;
	//Add (Issued books) (personal)
	JFrame borrow;
	//Allow booking/issueing of books
	//Fine Calculation
	JFrame fineCalculator;
	
	//Book Selection Srceen
	JFrame selection;
	Library() {
		big = new Font("Arial", Font.BOLD, 40);
		text = new Font("Arial", Font.PLAIN, 20);
		medium = new Font("Arial", Font.PLAIN, 30);
		Login("");
	}
	void Login(String error) {
		login = new JFrame();
		login.setSize(600,280);
		login.setLayout(null);
		
		JLabel title = new JLabel("Login Authentication System");
		title.setBounds(10,10,580,40);
		title.setFont(big);
		login.add(title);
		
		JLabel Username = new JLabel("Username: ");
		Username.setBounds(10,60,240,40);
		Username.setFont(medium);
		login.add(Username);

		JLabel Password = new JLabel("Password: ");
		Password.setBounds(10,100,250,40);
		Password.setFont(medium);
		login.add(Password);
		
		JTextField UserText = new JTextField("");
		UserText.setBounds(170,60,240,40);
		UserText.setFont(medium);;
		login.add(UserText);
		
		JTextField PassText = new JTextField("");
		PassText.setBounds(170,100,240,40);
		PassText.setFont(medium);
		login.add(PassText);
		
		JButton submit = new JButton("Submit");
		submit.setBounds(115, 150, 200, 40);
		submit.setFont(medium);
		login.add(submit);
		
		JLabel Error = new JLabel(error);
		Error.setBounds(10,200,400,40);
		Error.setFont(text);
		login.add(Error);
		
		submit.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Statement statement;
				ResultSet resultset;
				try {
					Class.forName("com.mysql.cj.jdbc.Driver");
					Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/Sample","root","levi2019");
					statement = connection.createStatement();
					resultset = statement.executeQuery("Select * from librarylogin");
					
					while (resultset.next()) {
						if (resultset.getString("Username").equals(UserText.getText()) && resultset.getString("Password").equals(PassText.getText())) {
							if (resultset.getBoolean("Admin")) {
								AdminMain();
							} else {
								MemberMain(resultset.getString("Username"));
							}
							break;
						} else {
							login.setVisible(false);
							Login("Wrong Password / Username");
						}
					}
					
					connection.close();
				} catch (ClassNotFoundException | SQLException e1) { 
					e1.printStackTrace();
				}
			}
		});
		
		login.setVisible(true);
	}
	void AdminMain() {
		login.setVisible(false);
		adminMain = new JFrame("");
		adminMain.setSize(630,630);
		adminMain.setLayout(null);
		
		JLabel title = new JLabel("Admin Management");
		title.setBounds(10,10,400,40);
		title.setFont(big);
		adminMain.add(title);
		
		JButton add = new JButton("Add Book");
		add.setBounds(10, 60, 200,200);
		add.setFont(text);
		adminMain.add(add);
		add.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				adminMain.setVisible(false);
				AddBook();
			}
		});
		
		JButton remove = new JButton("Remove Book");
		remove.setBounds(110, 260, 200, 200);
		remove.setFont(text);
		adminMain.add(remove);
		remove.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				adminMain.setVisible(false);
				Selection(2, "", "");
			}
		});
		
		JButton search = new JButton("Search Book");
		search.setBounds(210,60,200,200);
		search.setFont(text);
		adminMain.add(search);
		search.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				adminMain.setVisible(false);
				Selection(1, "", "");
			}
		});
		
		JButton borrows = new JButton("Borrows and Returns");
		borrows.setBounds(410,60,200,200);
		borrows.setFont(text);
		adminMain.add(borrows);
		borrows.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				adminMain.setVisible(false);
				Borrows();
			}
		});
		
		JButton exit = new JButton("Exit");
		exit.setBounds(310,260,200,200);
		exit.setFont(text);
		adminMain.add(exit);
		exit.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				adminMain.setVisible(false);
			}
		});
		
		adminMain.setVisible(true);
	}
	void MemberMain(String username) {
		login.setVisible(false);
		memberMain = new JFrame();
		memberMain.setLayout(null);
		memberMain.setSize(630,400);
		
		JLabel title = new JLabel("Welcome user "+username+"!");
		title.setBounds(10,10,400,40);
		title.setFont(big);
		memberMain.add(title);
		
		JButton search = new JButton("Search");
		search.setBounds(10, 80, 200,200);
		search.setFont(text);
		memberMain.add(search);
		search.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				memberMain.setVisible(false);
				Selection(3, "", username);
			}
		});
		
		JButton borrows = new JButton("Borrowed Books");
		borrows.setBounds(210, 80, 200,200);
		borrows.setFont(text);
		memberMain.add(borrows);
		borrows.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				memberMain.setVisible(false);
				BorrowsCalled(username);
			}
		});
		
		JButton fine = new JButton("Fine Calculation");
		fine.setBounds(410, 80, 200,200);
		fine.setFont(text);
		memberMain.add(fine);
		fine.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				memberMain.setVisible(false);
				CalculateFines(username);
			}
		});
		
		JButton exit = new JButton("Exit");
		exit.setBounds(10, 290, 600, 50);
		exit.setFont(text);
		memberMain.add(exit);
		exit.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				memberMain.setVisible(false);
			}
		});
		
		memberMain.setVisible(true);
	}
	void AddBook() {
		add = new JFrame();
		add.setLayout(null);
		add.setSize(550,250);
		
		JLabel title = new JLabel("Add Book");
		title.setBounds(10,10,500,50);
		title.setFont(big);
		add.add(title);
		
		JLabel bookName = new JLabel("Book Name");
		bookName.setBounds(10,70,250,40);
		bookName.setFont(text);
		add.add(bookName);
		
		JLabel bookAuthor = new JLabel("Author Name");
		bookAuthor.setBounds(10,110,250,40);
		bookAuthor.setFont(text);
		add.add(bookAuthor);
		
		JTextField textName = new JTextField("");
		textName.setBounds(260,70,250,40);
		textName.setFont(text);
		add.add(textName);
		
		JTextField textAuthor = new JTextField("");
		textAuthor.setBounds(260,110,250,40);
		textAuthor.setFont(text);
		add.add(textAuthor);
		
		JButton submit = new JButton("Submit");
		submit.setBounds(160,160,200,40);
		submit.setFont(text);
		add.add(submit);
		submit.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				add.setVisible(false);
				AdminMain();
				Statement statement;
				ResultSet resultset;
				try {
					Class.forName("com.mysql.cj.jdbc.Driver");
					Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/Sample","root","levi2019");
					statement = connection.createStatement();
					statement.execute("INSERT INTO `sample`.`books` (`name`, `author`) VALUES ('"+textName.getText()+"', '"+textAuthor.getText()+"');");
					connection.close();
				} catch (ClassNotFoundException | SQLException e1) { 
					e1.printStackTrace();
				}
			}
		});
		
		add.setVisible(true);;
		}
	void Borrows() {
		borrows = new JFrame("");
		borrows.setLayout(null);
		
		JLabel title = new JLabel("Issued / Borrowed Books");
		title.setBounds(10,10,500,50);
		title.setFont(big);
		borrows.add(title);
		
		JButton back = new JButton("Back");
		back.setBounds(10,60,200,40);
		back.setFont(medium);
		borrows.add(back);
		back.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				borrows.setVisible(false);
				AdminMain();
			}
		});
		
		JLabel bookTitle = new JLabel("Book Title");
		bookTitle.setBounds(10,110,200,40);
		bookTitle.setFont(medium);
		borrows.add(bookTitle);
		
		JLabel bookBorrower = new JLabel("Borrower");
		bookBorrower.setBounds(210,110,200,40);
		bookBorrower.setFont(medium);
		borrows.add(bookBorrower);
		
		JLabel bookDue = new JLabel("Due");
		bookDue.setBounds(410,110,190,40);
		bookDue.setFont(medium);
		borrows.add(bookDue);
		
		Statement statement;
		ResultSet resultset;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/Sample","root","levi2019");
			statement = connection.createStatement();
			resultset = statement.executeQuery("Select * from books");
			
			int count = 0;
			while (resultset.next()) {
				JLabel itemBookName = new JLabel(resultset.getString("name"));
				String borrower = "N/A";
				String due = "N/A";
				if (!(resultset.getString("borrower")==null)) {
					borrower=resultset.getString("borrower");
					due=resultset.getString("due");
				}
				JLabel itemBorrower = new JLabel(borrower);
				JLabel itemDue = new JLabel(due);
				
				itemBookName.setBounds(10,150+50*count, 200, 40);
				itemBorrower.setBounds(210,150+50*count, 200, 40);
				itemDue.setBounds(410, 150+50*count, 190, 40);
				
				itemBookName.setFont(text);
				itemBorrower.setFont(text);
				itemDue.setFont(text);
				
				borrows.add(itemBookName);
				borrows.add(itemBorrower);
				borrows.add(itemDue);
				
				count++;

				borrows.setSize(600,200+50*count);
			}		
			connection.close();
		} catch (ClassNotFoundException | SQLException e1) { 
			e1.printStackTrace();
		}
		
		borrows.setVisible(true);
	}
	void Selection(int mode, String errors, String username) {
		selection = new JFrame("");
		selection.setLayout(null);
		selection.setSize(600,300);
		
		JLabel title = new JLabel("Book Selection");
		title.setBounds(10,10,500,40);
		title.setFont(big);
		selection.add(title);
		
		JLabel bookName = new JLabel("Book Name: ");
		bookName.setBounds(10,60,200,40);
		bookName.setFont(medium);
		selection.add(bookName);
		
		JTextField textName = new JTextField("");
		textName.setBounds(220, 60, 250, 40);
		textName.setFont(medium);
		selection.add(textName);
		
		JLabel error = new JLabel(errors);
		error.setBounds(10, 100, 500, 40);
		error.setFont(medium);
		selection.add(error);
		
		JButton submit = new JButton("Submit");
		submit.setBounds(120,150, 200, 40);
		submit.setFont(medium);
		selection.add(submit);
		submit.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				selection.setVisible(false);
				
				Statement statement;
				ResultSet resultset;
				try {
					Class.forName("com.mysql.cj.jdbc.Driver");
					Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/Sample","root","levi2019");
					statement = connection.createStatement();
					resultset = statement.executeQuery("Select * from books");
					boolean found = false;
					int id = 0;
					while (resultset.next()) {
						if (resultset.getString("name").equals(textName.getText())) {
							found = true;
							id = resultset.getInt("id");
							break;
						}
					}		
					if (found) {
						if (mode == 1) {
							Selected(mode, id, username, "");
						} else if (mode==2) {
							Remove(mode, id);
						} else if (mode==3) {
							Selected(mode, id, username, "");
						}
					} else {
						Selection(mode, "Wrong Title", "");
					}
					connection.close();
				} catch (ClassNotFoundException | SQLException e1) { 
					e1.printStackTrace();
				}
			}
		});
		selection.setVisible(true);
	}
	void Selected(int mode, int id, String username, String error) {					
		search = new JFrame("");
		search.setLayout(null);
		search.setSize(600,450);
		
		Statement statement;
		ResultSet resultset;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/Sample","root","levi2019");
			statement = connection.createStatement();
			resultset = statement.executeQuery("Select * from books where id = "+id);
			
			JLabel title = new JLabel("Selected Book");
			title.setBounds(10,10,500,40);
			title.setFont(big);
			search.add(title);
			
			JLabel errors = new JLabel(error);
			errors.setBounds(10, 350, 200, 40);
			errors.setFont(text);
			search.add(errors);
			
			JButton home = new JButton("Home Page");
			home.setBounds(10,55, 200, 40);
			home.setFont(medium);
			search.add(home);
			home.addActionListener(new ActionListener() {
				public void actionPerformed(ActionEvent e) {
					search.setVisible(false);
					if (mode==1) {
						AdminMain();
					} else if (mode==3) {
						MemberMain(username);
					}
				}
			});
			
			if (mode==1) {
				JButton changeName = new JButton("Change");
				JButton changeAuthor = new JButton("Change");
				JButton changeBorrower = new JButton("Change");
				JButton changeDue = new JButton("Change");
				
				changeName.setBounds(310, 100, 150, 40); changeName.setFont(text); search.add(changeName);
				changeAuthor.setBounds(310, 150, 150, 40); changeAuthor.setFont(text); search.add(changeAuthor);
				changeBorrower.setBounds(310, 200, 150, 40); changeBorrower.setFont(text); search.add(changeBorrower);
				changeDue.setBounds(310, 250, 150, 40); changeDue.setFont(text); search.add(changeDue);
	
				changeName.addActionListener(new ActionListener() {
					public void actionPerformed(ActionEvent e) {
						search.setVisible(false);
						Input(id, "name", mode);
					}
				});
				changeAuthor.addActionListener(new ActionListener() {
					public void actionPerformed(ActionEvent e) {
						search.setVisible(false);
						Input(id, "author", mode);
					}
				});
				changeBorrower.addActionListener(new ActionListener() {
					public void actionPerformed(ActionEvent e) {
						search.setVisible(false);
						Input(id, "borrower", mode);
					}
				});
				changeDue.addActionListener(new ActionListener() {
					public void actionPerformed(ActionEvent e) {
						search.setVisible(false);
						Input(id, "due", mode);
					}
				});
			} else if (mode==3) {
				JButton borrow = new JButton("Place Order");
				borrow.setBounds(10,300,250,40);
				borrow.setFont(text);
				search.add(borrow);
				borrow.addActionListener(new ActionListener() {
					public void actionPerformed(ActionEvent e) {
							search.setVisible(false);
							
							Statement statement;
							ResultSet resultset;
							try {
								Class.forName("com.mysql.cj.jdbc.Driver");
								Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/Sample","root","levi2019");
								statement = connection.createStatement();
								LocalDateTime currentDateTime = LocalDateTime.now();
								String today = String.valueOf(currentDateTime);
								int todayYear = Integer.valueOf(today.substring(0,4));
								int todayMonth = Integer.valueOf(today.substring(5,7));
								int todayDay = Integer.valueOf(today.substring(8,10));
								todayDay = todayDay+30;
								if (todayMonth==1 || todayMonth==3 || todayMonth==5 || todayMonth==7 ||todayMonth==8 ||todayMonth==10 ||todayMonth==12) {
									if (todayDay>31) {
										todayMonth++;
										todayDay=todayDay-31;
									}
								} else if (todayMonth!=2) {
									if (todayDay>30) {
										todayMonth++;
										todayDay=todayDay-30;
									}
								} else {
									if (todayDay>28) {
										todayMonth++;
										todayDay=todayDay-28;
									}
								}
								if (todayMonth>12) {
									todayYear++;
									todayMonth=todayMonth-12;
								}
								String strMonth="";
								String strDay="";
								if (todayMonth<10) {
									strMonth = "0"+todayMonth;
								}
								if (todayDay<10) {
									strDay = "0"+todayDay;
								}
								String date = todayYear+"/"+strMonth+"/"+strDay;
								resultset = statement.executeQuery("Select * from books where id = "+id);
								while (resultset.next()) {
									if (resultset.getString("borrower")==null) {
										statement.execute("UPDATE books set borrower = '"+username+"', due='"+date+"' where id = "+id);
										Selected(mode, id, username, "");
									} else {
										Selected(mode, id, username, "Already Booked");
									}
								}
								connection.close();
							} catch (ClassNotFoundException | SQLException e1) { 
								e1.printStackTrace();
							}
					}
				});
			}
			
			JLabel Name = null; JLabel Author = null; JLabel Borrower = null; JLabel Due = null;
			while (resultset.next()) {
				Name = new JLabel("Book Name: "+resultset.getString("name"));
				Author = new JLabel("Author Name: "+resultset.getString("author"));
				if (resultset.getString("borrower")==null) {
					Borrower = new JLabel("Borrower: N/A");
				} else {
					Borrower = new JLabel("Borrower: "+resultset.getString("borrower"));
				}
				if (resultset.getString("due")==null) {
					Due = new JLabel("Due Date: N/A");
				} else {
					Due = new JLabel("Due: "+resultset.getString("due"));
				}
			}
			Name.setBounds(10, 100, 300, 40); Name.setFont(text); search.add(Name);
			Author.setBounds(10, 150, 300, 40); Author.setFont(text); search.add(Author);
			Borrower.setBounds(10, 200, 300, 40); Borrower.setFont(text); search.add(Borrower);
			Due.setBounds(10, 250, 300, 40); Due.setFont(text); search.add(Due);
			
			search.setVisible(true);
			connection.close();
		} catch (ClassNotFoundException | SQLException e1) { 
			e1.printStackTrace();
		}
	}
	void Input(int id, String column, int mode) {
		input = new JFrame("");
		input.setLayout(null);
		input.setSize(600,200);
		
		JLabel title = new JLabel("Input Value");
		title.setBounds(10,10,400,40);
		title.setFont(big);
		input.add(title);
		
		JTextField value = new JTextField("");
		value.setBounds(10,50,400,40);
		value.setFont(medium);
		input.add(value);
		
		JButton submit = new JButton("Submit");
		submit.setBounds(10, 100, 200, 40);
		submit.setFont(medium);
		input.add(submit);
		submit.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Statement statement;
				ResultSet resultset;
				try {
					Class.forName("com.mysql.cj.jdbc.Driver");
					Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/Sample","root","levi2019");
					statement = connection.createStatement();
					if (value.getText().equals("")) {
						statement.execute("UPDATE books SET "+column+" = null WHERE id="+id+";");
					} else {
						statement.execute("UPDATE books SET "+column+" = '"+value.getText()+"' WHERE id="+id+";");
					}
					connection.close();
				} catch (ClassNotFoundException | SQLException e1) { 
					e1.printStackTrace();
				}
				input.setVisible(false);
				Selected(mode, id, "", "");
			}
		});
		input.setVisible(true);
	}
	void Remove(int mode, int id) {
		Statement statement;
		ResultSet resultset;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/Sample","root","levi2019");
			statement = connection.createStatement();
			statement.execute("DELETE FROM books WHERE id="+id+";");
			AdminMain();
			
			connection.close();
		} catch (ClassNotFoundException | SQLException e1) { 
			e1.printStackTrace();
		}
	}
	void BorrowsCalled(String username) {
		borrow = new JFrame();
		borrow.setLayout(null);
		
		JLabel title = new JLabel("Your Borrowed Books");
		JButton back = new JButton("Back");
		
		title.setBounds(10,10,600,40);
		back.setBounds(10, 55, 150, 40);
		
		title.setFont(big);
		back.setFont(medium);
		
		borrow.add(title);
		borrow.add(back);
		
		JLabel bookTitle = new JLabel("Book Name");
		JLabel author = new JLabel("Author");
		JLabel due = new JLabel("Due Date");
		
		bookTitle.setBounds(10, 100, 200, 40);
		author.setBounds(210, 100, 200, 40);
		due.setBounds(410, 100, 200, 40);
		
		bookTitle.setFont(text); borrow.add(bookTitle);
		author.setFont(text); borrow.add(author);
		due.setFont(text); borrow.add(due);
		
		back.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				borrow.setVisible(false);
				MemberMain(username);
			}
		});
		
		Statement statement;
		ResultSet resultset;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/Sample","root","levi2019");
			statement = connection.createStatement();
			resultset = statement.executeQuery("Select * from books where borrower = '"+username+"';");
			
			int count = 0;
			while (resultset.next()) {
				count++;
				JLabel bTitle = new JLabel(resultset.getString("name"));
				JLabel bAuthor = new JLabel(resultset.getString("author"));
				JLabel bdue = new JLabel(resultset.getString("due"));
				
				bTitle.setFont(text);
				bAuthor.setFont(text);
				bdue.setFont(text);
				
				bTitle.setBounds(10, 100+(50*count), 200, 40);
				bAuthor.setBounds(210, 100+(50*count), 200, 40);
				bdue.setBounds(410, 100+(50*count), 200, 40);
				
				borrow.add(bTitle);
				borrow.add(bAuthor);
				borrow.add(bdue);
			}
			borrow.setSize(620,200+(50*count));
			
			connection.close();
		} catch (ClassNotFoundException | SQLException e1) { 
			e1.printStackTrace();
		}
		
		borrow.setVisible(true);
	}
	void CalculateFines(String username) {
		fineCalculator = new JFrame();
		fineCalculator.setLayout(null);
		
		Statement statement;
		ResultSet resultset;
		String date = null;

		LocalDateTime currentDateTime = LocalDateTime.now();
		String today = String.valueOf(currentDateTime);
		int todayYear = Integer.valueOf(today.substring(0,4));
		int todayMonth = Integer.valueOf(today.substring(5,7));
		int todayDay = Integer.valueOf(today.substring(8,10));
		int fine = 0;
		
		JLabel title = new JLabel("Fines");
		title.setBounds(10, 10, 590, 40);
		title.setFont(big);
		fineCalculator.add(title);
		
		JButton back = new JButton("Back");
		back.setBounds(10, 55, 150, 40);
		back.setFont(text);
		fineCalculator.add(back);
		back.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				fineCalculator.setVisible(false);
				MemberMain(username);
			}
		});
		
		
		JLabel titleName= new JLabel("Name");
		JLabel titleYear = new JLabel("Year");
		JLabel titleMonth = new JLabel("Month");
		JLabel titleDay = new JLabel("Day");
		JLabel titleOverdue = new JLabel("Overdue");
		titleName.setBounds(10, 100, 200, 40);
		titleYear.setBounds(210, 100, 100, 40);
		titleMonth.setBounds(310, 100, 100, 40);
		titleDay.setBounds(410, 100, 100, 40);
		titleOverdue.setBounds(510,100,100,40);
		titleName.setFont(text);
		titleYear.setFont(text);
		titleDay.setFont(text);
		titleMonth.setFont(text);
		titleOverdue.setFont(text);
		fineCalculator.add(titleName);
		fineCalculator.add(titleYear);
		fineCalculator.add(titleMonth);
		fineCalculator.add(titleDay);
		fineCalculator.add(titleOverdue);
		
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/Sample","root","levi2019");
			statement = connection.createStatement();
			resultset = statement.executeQuery("Select * from books where borrower = '"+username+"';");
			int count = 0;
			while (resultset.next()) {
				count++;
				date = resultset.getString("due");
				int year = Integer.valueOf(date.substring(0, 4));
				int month = Integer.valueOf(date.substring(5, 7));
				int day = Integer.valueOf(date.substring(8,10));
				boolean fined=false;
				if (todayYear>year) {
					fine=fine+10;
					fined=true;
				} else if(year==todayYear) {
					if (todayMonth>month) {
						fine=fine+10;
						fined=true;
					} else if (todayMonth==month) {
						if (todayDay>day) {
							fine=fine+10;
							fined=true;
						}
					}
				}
				JLabel Name= new JLabel(resultset.getString("name"));
				JLabel Year = new JLabel(""+year);
				JLabel Month = new JLabel(""+month);
				JLabel Day = new JLabel(""+day);
				JLabel Overdue = new JLabel(""+fined);
				Name.setBounds(10, 100+(count*50), 200, 40);
				Year.setBounds(210, 100+(count*50), 100, 40);
				Month.setBounds(310, 100+(count*50), 100, 40);
				Day.setBounds(410, 100+(count*50), 100, 40);
				Overdue.setBounds(510,100+(count*50),100,40);
				Name.setFont(text);
				Year.setFont(text);
				Day.setFont(text);
				Month.setFont(text);
				Overdue.setFont(text);
				fineCalculator.add(Name);
				fineCalculator.add(Year);
				fineCalculator.add(Month);
				fineCalculator.add(Day);
				fineCalculator.add(Overdue);
			}
			JLabel totalFine = new JLabel("Total Fine: $"+fine);
			totalFine.setBounds(10, 150+(count*50), 200, 40);
			totalFine.setFont(text);
			fineCalculator.add(totalFine);
			
			fineCalculator.setSize(610,250+(count*50));
		} catch (ClassNotFoundException | SQLException e1) { 
			e1.printStackTrace();
		}
		
		fineCalculator.setVisible(true);
	}
}